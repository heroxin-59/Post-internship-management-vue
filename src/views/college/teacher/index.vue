<template>
    <div class="app-container">
      <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
        <el-form-item label="教师账号" prop="userName">
          <el-input
            v-model="queryParams.userName"
            placeholder="请输入教师账号"
            clearable
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="教师昵称" prop="nickName">
          <el-input
            v-model="queryParams.nickName"
            placeholder="请输入教师昵称"
            clearable
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="教师邮箱" prop="email">
          <el-input
            v-model="queryParams.email"
            placeholder="请输入教师邮箱"
            clearable
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="手机号码" prop="phonenumber">
          <el-input
            v-model="queryParams.phonenumber"
            placeholder="请输入手机号码"
            clearable
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="教师性别" prop="sex">
          <el-select v-model="queryParams.sex" placeholder="请选择教师性别" clearable>
            <el-option
              v-for="dict in dict.type.sys_user_sex"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="所属学院" prop="deptId">
          <el-select v-model="queryParams.deptId" placeholder="请选择所属学院" clearable>
            <el-option
              v-for="dict in dict.type.internship_major"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            />
          </el-select>
        </el-form-item>
       <!--  <el-form-item label="头像地址" prop="avatar">
          <el-input
            v-model="queryParams.avatar"
            placeholder="请输入头像地址"
            clearable
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="queryParams.password"
            placeholder="请输入密码"
            clearable
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="最后登录IP" prop="loginIp">
          <el-input
            v-model="queryParams.loginIp"
            placeholder="请输入最后登录IP"
            clearable
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="最后登录时间" prop="loginDate">
          <el-date-picker clearable
            v-model="queryParams.loginDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择最后登录时间">
          </el-date-picker>
        </el-form-item> -->
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
            v-hasPermi="['college:teacher:add']"
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
            v-hasPermi="['college:teacher:edit']"
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
            v-hasPermi="['college:teacher:remove']"
          >删除</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button
            type="warning"
            plain
            icon="el-icon-download"
            size="mini"
            @click="handleExport"
            v-hasPermi="['college:teacher:export']"
          >导出</el-button>
        </el-col>
        <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
      </el-row>
  
      <el-table v-loading="loading" :data="teacherList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="教师" align="center" prop="userId" />
        <el-table-column label="所属学院" align="center" prop="deptId">
          <template slot-scope="scope">
            <dict-tag :options="dict.type.internship_major" :value="scope.row.deptId"/>
          </template>
        </el-table-column>
        <el-table-column label="教师账号" align="center" prop="userName" />
        <el-table-column label="教师昵称" align="center" prop="nickName" />
        <!-- <el-table-column label="教师类型" align="center" prop="userType" /> -->
        <el-table-column label="教师邮箱" align="center" prop="email" />
        <el-table-column label="手机号码" align="center" prop="phonenumber" />
        <el-table-column label="教师性别" align="center" prop="sex">
          <template slot-scope="scope">
            <dict-tag :options="dict.type.sys_user_sex" :value="scope.row.sex"/>
          </template>
        </el-table-column>
        <!-- <el-table-column label="头像地址" align="center" prop="avatar" /> -->
        <!-- <el-table-column label="密码" align="center" prop="password" /> -->
        <el-table-column label="帐号状态" align="center" prop="status" />
        <el-table-column label="最后登录IP" align="center" prop="loginIp" />
        <el-table-column label="最后登录时间" align="center" prop="loginDate" width="180">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.loginDate, '{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="备注" align="center" prop="remark" />
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              icon="el-icon-edit"
              @click="handleUpdate(scope.row)"
              v-hasPermi="['college:teacher:edit']"
            >修改</el-button>
            <el-button
              size="mini"
              type="text"
              icon="el-icon-delete"
              @click="handleDelete(scope.row)"
              v-hasPermi="['college:teacher:remove']"
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
  
      <!-- 添加或修改教师信息对话框 -->
      <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        
          <el-form-item label="教师账号" prop="userName">
            <el-input v-model="form.userName" placeholder="请输入教师账号" />
          </el-form-item>
          <el-form-item label="教师昵称" prop="nickName">
            <el-input v-model="form.nickName" placeholder="请输入教师昵称" />
          </el-form-item>
          <el-form-item label="教师邮箱" prop="email">
            <el-input v-model="form.email" placeholder="请输入教师邮箱" />
          </el-form-item>
          <el-form-item label="手机号码" prop="phonenumber">
            <el-input v-model="form.phonenumber" placeholder="请输入手机号码" />
          </el-form-item>
          <el-form-item label="教师性别" prop="sex">
            <el-select v-model="form.sex" placeholder="请选择教师性别">
              <el-option
                v-for="dict in dict.type.sys_user_sex"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" placeholder="请输入密码" />
          </el-form-item>
          <el-form-item label="所属学院" prop="deptId">
            <el-select v-model="form.deptId" placeholder="请选择所属学院">
              <el-option
                v-for="dict in dict.type.internship_major"
                :key="dict.value"
                :label="dict.label"
                :value="parseInt(dict.value)"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="头像地址" prop="avatar">
            <el-input v-model="form.avatar" placeholder="请输入头像地址" />
          </el-form-item>
          <el-form-item label="删除标志" prop="delFlag">
            <el-input v-model="form.delFlag" placeholder="请输入删除标志" />
          </el-form-item>
          <el-form-item label="最后登录IP" prop="loginIp">
            <el-input v-model="form.loginIp" placeholder="请输入最后登录IP" />
          </el-form-item>
          <el-form-item label="最后登录时间" prop="loginDate">
            <el-date-picker clearable
              v-model="form.loginDate"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="请选择最后登录时间">
            </el-date-picker>
          </el-form-item> -->
          <el-form-item label="备注" prop="remark">
            <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
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
  import { listTeacher, getTeacher, delTeacher, addTeacher, updateTeacher } from "@/api/college/teacher";
  
  export default {
    name: "Teacher",
    dicts: ['internship_major', 'sys_user_sex'],
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
        // 教师信息表格数据
        teacherList: [],
        // 弹出层标题
        title: "",
        // 是否显示弹出层
        open: false,
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          deptId: null,
          userName: null,
          nickName: null,
          userType: null,
          email: null,
          phonenumber: null,
          sex: null,
          avatar: null,
          password: null,
          status: null,
          loginIp: null,
          loginDate: null,
        },
        // 表单参数
        form: {},
        // 表单校验
        rules: {
          userName: [
            { required: true, message: "教师账号不能为空", trigger: "blur" }
          ],
          nickName: [
            { required: true, message: "教师昵称不能为空", trigger: "blur" }
          ],
        }
      };
    },
    created() {
      this.getList();
    },
    methods: {
      /** 查询教师信息列表 */
      getList() {
        this.loading = true;
        listTeacher(this.queryParams).then(response => {
          this.teacherList = response.rows;
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
          userId: null,
          deptId: null,
          userName: null,
          nickName: null,
          userType: null,
          email: null,
          phonenumber: null,
          sex: null,
          avatar: null,
          password: null,
          status: null,
          delFlag: null,
          loginIp: null,
          loginDate: null,
          createBy: null,
          createTime: null,
          updateBy: null,
          updateTime: null,
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
        this.ids = selection.map(item => item.userId)
        this.single = selection.length!==1
        this.multiple = !selection.length
      },
      /** 新增按钮操作 */
      handleAdd() {
        this.reset();
        this.open = true;
        this.title = "添加教师信息";
      },
      /** 修改按钮操作 */
      handleUpdate(row) {
        this.reset();
        const userId = row.userId || this.ids
        getTeacher(userId).then(response => {
          this.form = response.data;
          this.open = true;
          this.title = "修改教师信息";
        });
      },
      /** 提交按钮 */
      submitForm() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            if (this.form.userId != null) {
              updateTeacher(this.form).then(response => {
                this.$modal.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              });
            } else {
              addTeacher(this.form).then(response => {
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
        const userIds = row.userId || this.ids;
        this.$modal.confirm('是否确认删除教师信息编号为"' + userIds + '"的数据项？').then(function() {
          return delTeacher(userIds);
        }).then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
        }).catch(() => {});
      },
      /** 导出按钮操作 */
      handleExport() {
        this.download('college/teacher/export', {
          ...this.queryParams
        }, `teacher_${new Date().getTime()}.xlsx`)
      }
    }
  };
  </script>
  