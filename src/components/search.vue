<template>
  <div class="search">
    <a-form-model
      layout="inline"
      :model="searchForm"
      @submit="handleSubmit"
      @submit.native.prevent
    >
      <a-form-model-item label="搜索关键字：">
        <a-input v-model="searchForm.searchWord" placeholder="请输入关键字">
        </a-input>
      </a-form-model-item>
      <a-form-model-item label="商品类目：">
        <a-select
          show-search
          placeholder="请选择商品类目"
          style="width: 200px"
          @change="handleChange"
          allowClear
        >
          <a-select-option
            v-for="c in data"
            :key="c._id"
            :value="c.id"
            >{{ c.name }}</a-select-option
          >
        </a-select>
      </a-form-model-item>
      <a-form-model-item>
        <a-button type="primary" html-type="submit"> Search </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>

export default {
  data() {
    return {
      searchForm: {
        searchWord: '',
        category: '',
      },
      categoryList: [],
    };
  },
  props: ['data'],
  methods: {
    handleSubmit() {
      this.$emit('submit', this.sea);
    },
    handleChange(val) {
      this.searchForm.category = val;
    },
  },
};
</script>

<style lang="less" scoped>
    .search{
        padding: 10px 40px;
    }
</style>
