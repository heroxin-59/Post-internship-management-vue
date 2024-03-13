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
      <el-form-item label="实习生ID" prop="studentId">
        <el-input
          v-model="queryParams.studentId"
          placeholder="请输入实习生ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="指导教师ID" prop="teacherId">
        <el-input
          v-model="queryParams.teacherId"
          placeholder="请输入指导教师ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="实习单位指导教师ID" prop="companyTeacherId">
        <el-input
          v-model="queryParams.companyTeacherId"
          placeholder="请输入实习单位指导教师ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="实习单位ID" prop="companyId">
        <el-input
          v-model="queryParams.companyId"
          placeholder="请输入实习单位ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="出勤成绩" prop="cqGrages">
        <el-input
          v-model="queryParams.cqGrages"
          placeholder="请输入出勤成绩"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="工作态度成绩" prop="atGrades">
        <el-input
          v-model="queryParams.atGrades"
          placeholder="请输入工作态度成绩"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="实习日志成绩" prop="logGrades">
        <el-input
          v-model="queryParams.logGrades"
          placeholder="请输入实习日志成绩"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="团队协助成绩" prop="teamGrades">
        <el-input
          v-model="queryParams.teamGrades"
          placeholder="请输入团队协助成绩"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="综合成绩" prop="score">
        <el-input
          v-model="queryParams.score"
          placeholder="请输入综合成绩"
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
          v-hasPermi="['system:grades:add']"
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
          v-hasPermi="['system:grades:edit']"
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
          v-hasPermi="['system:grades:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:grades:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="gradesList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="主键ID" align="center" prop="id" />
      <el-table-column label="实习生学号" align="center" prop="code" />
      <el-table-column label="实习生ID" align="center" prop="studentId" />
      <el-table-column label="指导教师ID" align="center" prop="teacherId" />
      <el-table-column label="实习单位指导教师ID" align="center" prop="companyTeacherId" />
      <el-table-column label="实习单位ID" align="center" prop="companyId" />
      <el-table-column label="出勤成绩" align="center" prop="cqGrages" />
      <el-table-column label="工作态度成绩" align="center" prop="atGrades" />
      <el-table-column label="实习日志成绩" align="center" prop="logGrades" />
      <el-table-column label="团队协助成绩" align="center" prop="teamGrades" />
      <el-table-column label="综合成绩" align="center" prop="score" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:grades:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:grades:remove']"
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
        <el-form-item label="实习生ID" prop="studentId">
          <el-input v-model="form.studentId" placeholder="请输入实习生ID" />
        </el-form-item>
        <el-form-item label="指导教师ID" prop="teacherId">
          <el-input v-model="form.teacherId" placeholder="请输入指导教师ID" />
        </el-form-item>
        <el-form-item label="实习单位指导教师ID" prop="companyTeacherId">
          <el-input v-model="form.companyTeacherId" placeholder="请输入实习单位指导教师ID" />
        </el-form-item>
        <el-form-item label="实习单位ID" prop="companyId">
          <el-input v-model="form.companyId" placeholder="请输入实习单位ID" />
        </el-form-item>
        <el-form-item label="出勤成绩" prop="cqGrages">
          <el-input v-model="form.cqGrages" placeholder="请输入出勤成绩" />
        </el-form-item>
        <el-form-item label="工作态度成绩" prop="atGrades">
          <el-input v-model="form.atGrades" placeholder="请输入工作态度成绩" />
        </el-form-item>
        <el-form-item label="实习日志成绩" prop="logGrades">
          <el-input v-model="form.logGrades" placeholder="请输入实习日志成绩" />
        </el-form-item>
        <el-form-item label="团队协助成绩" prop="teamGrades">
          <el-input v-model="form.teamGrades" placeholder="请输入团队协助成绩" />
        </el-form-item>
        <el-form-item label="综合成绩" prop="score">
          <el-input v-model="form.score" placeholder="请输入综合成绩" />
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
import { listGrades, getGrades, delGrades, addGrades, updateGrades } from "@/api/internship/grades";

export default {
  name: "Grades",
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
        studentId: null,
        teacherId: null,
        companyTeacherId: null,
        companyId: null,
        cqGrages: null,
        atGrades: null,
        logGrades: null,
        teamGrades: null,
        score: null
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
        studentId: null,
        teacherId: null,
        companyTeacherId: null,
        companyId: null,
        cqGrages: null,
        atGrades: null,
        logGrades: null,
        teamGrades: null,
        score: null
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
      this.download('internship/grades/export', {
        ...this.queryParams
      }, `grades_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
