<template>
  <div class="basic-detail">
    <a-form-model
      ref="ruleForm"
      :model="form"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 13 }"
      :rules="rules"
    >
      <a-form-model-item label="商品标题" required prop="title">
        <a-input v-model="form.title" />
      </a-form-model-item>
      <a-form-model-item label="商品描述" prop="desc">
        <a-input v-model="form.desc" />
      </a-form-model-item>
      <a-form-model-item label="商品类目" prop="category" required>
        <a-select
          v-model="form.category"
          placeholder="请选择商品种类"
          @change="changeCategory"
        >
          <a-select-option
            v-for="c in categoryList"
            :key="c.id"
            :value="c.id"
            >{{ c.name }}</a-select-option
          >
        </a-select>
        <a-select v-model="form.c_item" placeholder="请添加该商品的子类">
          <a-select-option v-for="c in categoryItems" :key="c" :value="c">{{
            c
          }}</a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="商品标签" prop="tags" required>
        <a-select
          mode="tags"
          placeholder="Please select"
          :default-value="['包邮，最晚次日达']"
          v-model="form.tags"
        >
          <a-select-option value="包邮，最晚次日达"
            >包邮，最晚次日达</a-select-option
          >
        </a-select>
      </a-form-model-item>
      <a-form-model-item class="next-btn" :wrapperCol="{ span: 24 }">
        <a-button @click="next" type="primary">下一步</a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import categoryApi from '@/api/category';

export default {
  props: ['form'],
  data() {
    return {
      // form: {
      //   title: '',
      //   desc: '',
      //   category: '',
      //   c_items: '',
      //   tags: '',
      // },
      rules: {},
      categoryList: [],
      categoryItems: [],
    };
  },
  //   传入类目数据
  created() {
    categoryApi.list().then((res) => {
      this.categoryList = res.data;
    });
  },
  methods: {
    // 子类目数据随着类目数据的改变而改变
    changeCategory(category) {
      for (let i = 0; i < this.categoryList.length; i += 1) {
        if (this.categoryList[i].id === category) {
          this.categoryItems = this.categoryList[i].c_items;
        }
      }
    },
    // $emit传递表单 ？？？ 到productAdd
    // 子组件可以使用 $emit 触发父组件的自定义事件
    // 第二个值传参
    next() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit('next', this.form);
          return true;
        }
        console.log('error submit!!');
        return false;
      });
    },
  },
};
</script>

<style scoped>
.next-btn {
  text-align: center;
}
</style>
