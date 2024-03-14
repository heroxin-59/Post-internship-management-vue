<template>
    <div class="app-container">
      <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
        <el-form-item label="实习单位" prop="company">
          <el-select v-model="queryParams.company" placeholder="请选择实习单位" clearable>
            <el-option
              v-for="dict in dict.type.internship_company"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="实习岗位" prop="duty">
          <el-select v-model="queryParams.duty" placeholder="请选择实习岗位" clearable>
            <el-option
              v-for="dict in dict.type.internship_post"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="所需专业" prop="major">
          <el-select v-model="queryParams.major" placeholder="请选择所需专业" clearable>
            <el-option
              v-for="dict in dict.type.internship_major"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="实习工作内容" prop="workContent">
          <el-input
            v-model="queryParams.workContent"
            placeholder="请输入实习工作内容"
            clearable
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="实习开始时间" prop="startDate">
          <el-date-picker clearable
            v-model="queryParams.startDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择实习开始时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="实习结束时间" prop="endDate">
          <el-date-picker clearable
            v-model="queryParams.endDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择实习结束时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="联系人" prop="contract">
          <el-input
            v-model="queryParams.contract"
            placeholder="请输入联系人"
            clearable
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>
  
      <el-row :gutter="10" class="mb8">
        <el-col :span="1.5">
          <el-button
            type="primary"
            plain
            icon="el-icon-plus"
            size="mini"
            @click="handleAdd"
            v-hasPermi="['company:information:add']"
          >新增</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button
            type="success"
            plain
            icon="el-icon-edit"
            size="mini"
            :disabled="single"
            @click="handleUpdate"
            v-hasPermi="['company:information:edit']"
          >修改</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button
            type="danger"
            plain
            icon="el-icon-delete"
            size="mini"
            :disabled="multiple"
            @click="handleDelete"
            v-hasPermi="['company:information:remove']"
          >删除</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button
            type="warning"
            plain
            icon="el-icon-download"
            size="mini"
            @click="handleExport"
            v-hasPermi="['company:information:export']"
          >导出</el-button>
        </el-col>
        <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
      </el-row>
  
      <el-table v-loading="loading" :data="informationList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="主键ID" align="center" prop="id" />
        <el-table-column label="实习单位" align="center" prop="company">
          <template slot-scope="scope">
            <dict-tag :options="dict.type.internship_company" :value="scope.row.company"/>
          </template>
        </el-table-column>
        <el-table-column label="实习岗位" align="center" prop="duty">
          <template slot-scope="scope">
            <dict-tag :options="dict.type.internship_post" :value="scope.row.duty"/>
          </template>
        </el-table-column>
        <el-table-column label="所需专业" align="center" prop="major">
          <template slot-scope="scope">
            <dict-tag :options="dict.type.internship_major" :value="scope.row.major"/>
          </template>
        </el-table-column>
        <el-table-column label="实习工作内容" align="center" prop="workContent" />
        <el-table-column label="实习开始时间" align="center" prop="startDate" width="180">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.startDate, '{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="实习结束时间" align="center" prop="endDate" width="180">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.endDate, '{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="联系人" align="center" prop="contract" />
        <el-table-column label="备注" align="center" prop="remark" />
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              icon="el-icon-edit"
              @click="handleUpdate(scope.row)"
              v-hasPermi="['company:information:edit']"
            >修改</el-button>
            <el-button
              size="mini"
              type="text"
              icon="el-icon-delete"
              @click="handleDelete(scope.row)"
              v-hasPermi="['company:information:remove']"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      
      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @pagination="getList"
      />
  
      <!-- 添加或修改实习信息对话框 -->
      <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
          <el-form-item label="实习单位" prop="company">
            <el-select v-model="form.company" placeholder="请选择实习单位">
              <el-option
                v-for="dict in dict.type.internship_company"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="实习岗位" prop="duty">
            <el-select v-model="form.duty" placeholder="请选择实习岗位">
              <el-option
                v-for="dict in dict.type.internship_post"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所需专业" prop="major">
            <el-select v-model="form.major" placeholder="请选择所需专业">
              <el-option
                v-for="dict in dict.type.internship_major"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="实习工作内容" prop="workContent">
            <el-input v-model="form.workContent" placeholder="请输入实习工作内容" />
          </el-form-item>
          <el-form-item label="实习开始时间" prop="startDate">
            <el-date-picker clearable
              v-model="form.startDate"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="请选择实习开始时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="实习结束时间" prop="endDate">
            <el-date-picker clearable
              v-model="form.endDate"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="请选择实习结束时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="联系人" prop="contract">
            <el-input v-model="form.contract" placeholder="请输入联系人" />
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input v-model="form.remark" placeholder="请输入备注" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </el-dialog>
    </div>
  </template>
  
  <script>
  import { listInformation, getInformation, delInformation, addInformation, updateInformation } from "@/api/company/information";
  
  export default {
    name: "Information",
    dicts: ['internship_post', 'internship_major', 'internship_company'],
    data() {
      return {
        // 遮罩层
        loading: true,
        // 选中数组
        ids: [],
        // 非单个禁用
        single: true,
        // 非多个禁用
        multiple: true,
        // 显示搜索条件
        showSearch: true,
        // 总条数
        total: 0,
        // 实习信息表格数据
        informationList: [],
        // 弹出层标题
        title: "",
        // 是否显示弹出层
        open: false,
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          company: null,
          duty: null,
          major: null,
          workContent: null,
          startDate: null,
          endDate: null,
          contract: null,
        },
        // 表单参数
        form: {},
        // 表单校验
        rules: {
        }
      };
    },
    created() {
      this.getList();
    },
    methods: {
      /** 查询实习信息列表 */
      getList() {
        this.loading = true;
        listInformation(this.queryParams).then(response => {
          this.informationList = response.rows;
          this.total = response.total;
          this.loading = false;
        });
      },
      // 取消按钮
      cancel() {
        this.open = false;
        this.reset();
      },
      // 表单重置
      reset() {
        this.form = {
          id: null,
          company: null,
          duty: null,
          major: null,
          workContent: null,
          startDate: null,
          endDate: null,
          contract: null,
          remark: null
        };
        this.resetForm("form");
      },
      /** 搜索按钮操作 */
      handleQuery() {
        this.queryParams.pageNum = 1;
        this.getList();
      },
      /** 重置按钮操作 */
      resetQuery() {
        this.resetForm("queryForm");
        this.handleQuery();
      },
      // 多选框选中数据
      handleSelectionChange(selection) {
        this.ids = selection.map(item => item.id)
        this.single = selection.length!==1
        this.multiple = !selection.length
      },
      /** 新增按钮操作 */
      handleAdd() {
        this.reset();
        this.open = true;
        this.title = "添加实习信息";
      },
      /** 修改按钮操作 */
      handleUpdate(row) {
        this.reset();
        const id = row.id || this.ids
        getInformation(id).then(response => {
          this.form = response.data;
          this.open = true;
          this.title = "修改实习信息";
        });
      },
      /** 提交按钮 */
      submitForm() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            if (this.form.id != null) {
              updateInformation(this.form).then(response => {
                this.$modal.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              });
            } else {
              addInformation(this.form).then(response => {
                this.$modal.msgSuccess("新增成功");
                this.open = false;
                this.getList();
              });
            }
          }
        });
      },
      /** 删除按钮操作 */
      handleDelete(row) {
        const ids = row.id || this.ids;
        this.$modal.confirm('是否确认删除实习信息编号为"' + ids + '"的数据项？').then(function() {
          return delInformation(ids);
        }).then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
        }).catch(() => {});
      },
      /** 导出按钮操作 */
      handleExport() {
        this.download('company/information/export', {
          ...this.queryParams
        }, `information_${new Date().getTime()}.xlsx`)
      }
    }
  };
  </script>
  