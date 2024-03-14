<template>
    <div class="app-container">
      <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
        <el-form-item label="实习生学号" prop="code">
          <el-input
            v-model="queryParams.code"
            placeholder="请输入实习生学号"
            clearable
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="实习生" prop="student">
          <el-input
            v-model="queryParams.student"
            placeholder="请输入实习生"
            clearable
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="指导教师" prop="teachet">
          <el-input
            v-model="queryParams.teachet"
            placeholder="请输入指导教师"
            clearable
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="实习单位负责人" prop="companyTeacher">
          <el-input
            v-model="queryParams.companyTeacher"
            placeholder="请输入实习单位负责人"
            clearable
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
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
        <el-form-item label="出勤成绩1" prop="cq1Grages">
          <el-input
            v-model="queryParams.cq1Grages"
            placeholder="请输入出勤成绩1"
            clearable
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="工作态度成绩1" prop="at1Grades">
          <el-input
            v-model="queryParams.at1Grades"
            placeholder="请输入工作态度成绩1"
            clearable
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="实习日志成绩1" prop="log1Grades">
          <el-input
            v-model="queryParams.log1Grades"
            placeholder="请输入实习日志成绩1"
            clearable
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="团队协助成绩1" prop="team1Grades">
          <el-input
            v-model="queryParams.team1Grades"
            placeholder="请输入团队协助成绩1"
            clearable
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="综合成绩1" prop="score">
          <el-input
            v-model="queryParams.score"
            placeholder="请输入综合成绩1"
            clearable
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="出勤成绩2" prop="cq2Grades">
          <el-input
            v-model="queryParams.cq2Grades"
            placeholder="请输入出勤成绩2"
            clearable
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="工作态度成绩2" prop="at2Grades">
          <el-input
            v-model="queryParams.at2Grades"
            placeholder="请输入工作态度成绩2"
            clearable
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="实习日志成绩2" prop="log2Grades">
          <el-input
            v-model="queryParams.log2Grades"
            placeholder="请输入实习日志成绩2"
            clearable
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="团队协助成绩2" prop="team2Grades">
          <el-input
            v-model="queryParams.team2Grades"
            placeholder="请输入团队协助成绩2"
            clearable
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="综合成绩2" prop="score1">
          <el-input
            v-model="queryParams.score1"
            placeholder="请输入综合成绩2"
            clearable
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="总成绩" prop="totalScore">
          <el-input
            v-model="queryParams.totalScore"
            placeholder="请输入总成绩"
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
            v-hasPermi="['company:grades:add']"
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
            v-hasPermi="['company:grades:edit']"
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
            v-hasPermi="['company:grades:remove']"
          >删除</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button
            type="warning"
            plain
            icon="el-icon-download"
            size="mini"
            @click="handleExport"
            v-hasPermi="['company:grades:export']"
          >导出</el-button>
        </el-col>
        <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
      </el-row>
  
      <el-table v-loading="loading" :data="gradesList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="主键ID" align="center" prop="id" />
        <el-table-column label="实习生学号" align="center" prop="code" />
        <el-table-column label="实习生" align="center" prop="student" />
        <el-table-column label="指导教师" align="center" prop="teachet" />
        <el-table-column label="实习单位负责人" align="center" prop="companyTeacher" />
        <el-table-column label="实习单位" align="center" prop="company">
          <template slot-scope="scope">
            <dict-tag :options="dict.type.internship_company" :value="scope.row.company"/>
          </template>
        </el-table-column>
        <el-table-column label="出勤成绩1" align="center" prop="cq1Grages" />
        <el-table-column label="工作态度成绩1" align="center" prop="at1Grades" />
        <el-table-column label="实习日志成绩1" align="center" prop="log1Grades" />
        <el-table-column label="团队协助成绩1" align="center" prop="team1Grades" />
        <el-table-column label="综合成绩1" align="center" prop="score" />
        <el-table-column label="出勤成绩2" align="center" prop="cq2Grades" />
        <el-table-column label="工作态度成绩2" align="center" prop="at2Grades" />
        <el-table-column label="实习日志成绩2" align="center" prop="log2Grades" />
        <el-table-column label="团队协助成绩2" align="center" prop="team2Grades" />
        <el-table-column label="综合成绩2" align="center" prop="score1" />
        <el-table-column label="总成绩" align="center" prop="totalScore" />
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              icon="el-icon-edit"
              @click="handleUpdate(scope.row)"
              v-hasPermi="['company:grades:edit']"
            >修改</el-button>
            <el-button
              size="mini"
              type="text"
              icon="el-icon-delete"
              @click="handleDelete(scope.row)"
              v-hasPermi="['company:grades:remove']"
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
  
      <!-- 添加或修改实习成绩信息对话框 -->
      <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
          <el-form-item label="实习生学号" prop="code">
            <el-input v-model="form.code" placeholder="请输入实习生学号" />
          </el-form-item>
          <el-form-item label="实习生" prop="student">
            <el-input v-model="form.student" placeholder="请输入实习生" />
          </el-form-item>
          <el-form-item label="指导教师" prop="teachet">
            <el-input v-model="form.teachet" placeholder="请输入指导教师" />
          </el-form-item>
          <el-form-item label="实习单位负责人" prop="companyTeacher">
            <el-input v-model="form.companyTeacher" placeholder="请输入实习单位负责人" />
          </el-form-item>
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
          <el-form-item label="出勤成绩1" prop="cq1Grages">
            <el-input v-model="form.cq1Grages" placeholder="请输入出勤成绩1" />
          </el-form-item>
          <el-form-item label="工作态度成绩1" prop="at1Grades">
            <el-input v-model="form.at1Grades" placeholder="请输入工作态度成绩1" />
          </el-form-item>
          <el-form-item label="实习日志成绩1" prop="log1Grades">
            <el-input v-model="form.log1Grades" placeholder="请输入实习日志成绩1" />
          </el-form-item>
          <el-form-item label="团队协助成绩1" prop="team1Grades">
            <el-input v-model="form.team1Grades" placeholder="请输入团队协助成绩1" />
          </el-form-item>
          <el-form-item label="综合成绩1" prop="score">
            <el-input v-model="form.score" placeholder="请输入综合成绩1" />
          </el-form-item>
          <el-form-item label="出勤成绩2" prop="cq2Grades">
            <el-input v-model="form.cq2Grades" placeholder="请输入出勤成绩2" />
          </el-form-item>
          <el-form-item label="工作态度成绩2" prop="at2Grades">
            <el-input v-model="form.at2Grades" placeholder="请输入工作态度成绩2" />
          </el-form-item>
          <el-form-item label="实习日志成绩2" prop="log2Grades">
            <el-input v-model="form.log2Grades" placeholder="请输入实习日志成绩2" />
          </el-form-item>
          <el-form-item label="团队协助成绩2" prop="team2Grades">
            <el-input v-model="form.team2Grades" placeholder="请输入团队协助成绩2" />
          </el-form-item>
          <el-form-item label="综合成绩2" prop="score1">
            <el-input v-model="form.score1" placeholder="请输入综合成绩2" />
          </el-form-item>
          <el-form-item label="总成绩" prop="totalScore">
            <el-input v-model="form.totalScore" placeholder="请输入总成绩" />
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
  import { listGrades, getGrades, delGrades, addGrades, updateGrades } from "@/api/company/grades";
  
  export default {
    name: "Grades",
    dicts: ['internship_company'],
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
        // 实习成绩信息表格数据
        gradesList: [],
        // 弹出层标题
        title: "",
        // 是否显示弹出层
        open: false,
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          code: null,
          student: null,
          teachet: null,
          companyTeacher: null,
          company: null,
          cq1Grages: null,
          at1Grades: null,
          log1Grades: null,
          team1Grades: null,
          score: null,
          cq2Grades: null,
          at2Grades: null,
          log2Grades: null,
          team2Grades: null,
          score1: null,
          totalScore: null
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
      /** 查询实习成绩信息列表 */
      getList() {
        this.loading = true;
        listGrades(this.queryParams).then(response => {
          this.gradesList = response.rows;
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
          code: null,
          student: null,
          teachet: null,
          companyTeacher: null,
          company: null,
          cq1Grages: null,
          at1Grades: null,
          log1Grades: null,
          team1Grades: null,
          score: null,
          cq2Grades: null,
          at2Grades: null,
          log2Grades: null,
          team2Grades: null,
          score1: null,
          totalScore: null
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
        this.title = "添加实习成绩信息";
      },
      /** 修改按钮操作 */
      handleUpdate(row) {
        this.reset();
        const id = row.id || this.ids
        getGrades(id).then(response => {
          this.form = response.data;
          this.open = true;
          this.title = "修改实习成绩信息";
        });
      },
      /** 提交按钮 */
      submitForm() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            if (this.form.id != null) {
              updateGrades(this.form).then(response => {
                this.$modal.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              });
            } else {
              addGrades(this.form).then(response => {
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
        this.$modal.confirm('是否确认删除实习成绩信息编号为"' + ids + '"的数据项？').then(function() {
          return delGrades(ids);
        }).then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
        }).catch(() => {});
      },
      /** 导出按钮操作 */
      handleExport() {
        this.download('company/grades/export', {
          ...this.queryParams
        }, `grades_${new Date().getTime()}.xlsx`)
      }
    }
  };
  </script>
  