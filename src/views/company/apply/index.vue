<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="实习学生姓名" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入实习学生姓名"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="实习生学号" prop="code">
        <el-input
          v-model="queryParams.code"
          placeholder="请输入实习生学号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="所学专业" prop="major">
        <el-select v-model="queryParams.major" placeholder="请选择所学专业" clearable>
          <el-option
            v-for="dict in dict.type.internship_major"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="申请时间" prop="applyDate">
        <el-date-picker clearable
          v-model="queryParams.applyDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择申请时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="申请理由" prop="reason">
        <el-input
          v-model="queryParams.reason"
          placeholder="请输入申请理由"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="申请实习单位" prop="company">
        <el-select v-model="queryParams.company" placeholder="请选择申请实习单位" clearable>
          <el-option
            v-for="dict in dict.type.internship_company"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="申请岗位" prop="post">
        <el-select v-model="queryParams.post" placeholder="请选择申请岗位" clearable>
          <el-option
            v-for="dict in dict.type.internship_post"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="指导教师意见" prop="teacherMemo">
        <el-select v-model="queryParams.teacherMemo" placeholder="请选择指导教师意见" clearable>
          <el-option
            v-for="dict in dict.type.internship_momo"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="实习单位负责人意见" prop="headMemo">
        <el-select v-model="queryParams.headMemo" placeholder="请选择实习单位负责人意见" clearable>
          <el-option
            v-for="dict in dict.type.internship_momo"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="申请状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择申请状态" clearable>
          <el-option
            v-for="dict in dict.type.internship_status"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
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
          v-hasPermi="['company:apply:add']"
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
          v-hasPermi="['company:apply:edit']"
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
          v-hasPermi="['company:apply:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['company:apply:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="applyList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="主键ID" align="center" prop="id" />
      <el-table-column label="实习学生姓名" align="center" prop="name" />
      <el-table-column label="实习生学号" align="center" prop="code" />
      <el-table-column label="所学专业" align="center" prop="major">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.internship_major" :value="scope.row.major"/>
        </template>
      </el-table-column>
      <el-table-column label="申请时间" align="center" prop="applyDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.applyDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="申请理由" align="center" prop="reason" />
      <el-table-column label="申请实习单位" align="center" prop="company">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.internship_company" :value="scope.row.company"/>
        </template>
      </el-table-column>
      <el-table-column label="申请岗位" align="center" prop="post">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.internship_post" :value="scope.row.post"/>
        </template>
      </el-table-column>
      <el-table-column label="指导教师意见" align="center" prop="teacherMemo">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.internship_momo" :value="scope.row.teacherMemo"/>
        </template>
      </el-table-column>
      <el-table-column label="实习单位负责人意见" align="center" prop="headMemo">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.internship_momo" :value="scope.row.headMemo"/>
        </template>
      </el-table-column>
      <el-table-column label="申请状态" align="center" prop="status">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.internship_status" :value="scope.row.status"/>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['company:apply:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['company:apply:remove']"
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

    <!-- 添加或修改实习申请信息对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="实习学生姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入实习学生姓名" />
        </el-form-item>
        <el-form-item label="实习生学号" prop="code">
          <el-input v-model="form.code" placeholder="请输入实习生学号" />
        </el-form-item>
        <el-form-item label="所学专业" prop="major">
          <el-select v-model="form.major" placeholder="请选择所学专业">
            <el-option
              v-for="dict in dict.type.internship_major"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申请时间" prop="applyDate">
          <el-date-picker clearable
            v-model="form.applyDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择申请时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="申请理由" prop="reason">
          <el-input v-model="form.reason" placeholder="请输入申请理由" />
        </el-form-item>
        <el-form-item label="申请实习单位" prop="company">
          <el-select v-model="form.company" placeholder="请选择申请实习单位">
            <el-option
              v-for="dict in dict.type.internship_company"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申请岗位" prop="post">
          <el-select v-model="form.post" placeholder="请选择申请岗位">
            <el-option
              v-for="dict in dict.type.internship_post"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="指导教师意见" prop="teacherMemo">
          <el-select v-model="form.teacherMemo" placeholder="请选择指导教师意见">
            <el-option
              v-for="dict in dict.type.internship_momo"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="实习单位负责人意见" prop="headMemo">
          <el-select v-model="form.headMemo" placeholder="请选择实习单位负责人意见">
            <el-option
              v-for="dict in dict.type.internship_momo"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申请状态" prop="status">
          <el-select v-model="form.status" placeholder="请选择申请状态">
            <el-option
              v-for="dict in dict.type.internship_status"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
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
import { listApply, getApply, delApply, addApply, updateApply } from "@/api/company/apply";

export default {
  name: "Apply",
  dicts: ['internship_major', 'internship_post', 'internship_momo', 'internship_status', 'internship_company'],
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
      // 实习申请信息表格数据
      applyList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        name: null,
        code: null,
        major: null,
        applyDate: null,
        reason: null,
        company: null,
        post: null,
        teacherMemo: null,
        headMemo: null,
        status: null
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
    /** 查询实习申请信息列表 */
    getList() {
      this.loading = true;
      listApply(this.queryParams).then(response => {
        this.applyList = response.rows;
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
        name: null,
        code: null,
        major: null,
        applyDate: null,
        reason: null,
        company: null,
        post: null,
        teacherMemo: null,
        headMemo: null,
        status: null
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
      this.title = "添加实习申请信息";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getApply(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改实习申请信息";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateApply(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addApply(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除实习申请信息编号为"' + ids + '"的数据项？').then(function() {
        return delApply(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('company/apply/export', {
        ...this.queryParams
      }, `apply_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
