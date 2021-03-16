<template>
  <div class="product-list">
    <!-- 搜索部分 -->
    <search @submit="searchSubmit" :data="categoryList" />
    <!-- 添加商品按钮 -->
    <a-button class="product-add-btn">
      <router-link :to="{ name: 'ProductAdd' }">添加商品</router-link>
    </a-button>
    <!-- 表格显示部分 -->
    <!-- 绑定data对应:data-source="tableData" -->
    <!-- categoryList映射到productTable -->
    <!-- @edit="editProduct"对应子组件editProduct的方法$emit -->
    <!-- 父组件中的方法对应editProduct -->
    <product-table
      :data="tableData"
      :page="page"
      @change="changePage"
      :categoryList="categoryList"
      @edit="editProduct"
      @remove="removeProduct"
    >
    </product-table>
  </div>
</template>

<script>
import Search from '@/components/search.vue';
import productTable from '@/components/productTable.vue';
import api from '@/api/product';
import categoryApi from '@/api/category';

export default {
  data() {
    return {
      categoryList: [],
      tableData: [],
      // 搜索值
      searchForm: {},
      page: {
        current: 1,
        pageSize: 10,
        showSizeChanger: true,
        total: 1,
      },
      categoryObj: {},
    };
  },
  components: {
    Search,
    productTable,
  },
  // 获取数据的先后 【先获取类目 在获取表格数据】
  async created() {
    await categoryApi.list().then((res) => {
      this.categoryList = res.data;
      res.data.forEach((item) => {
        this.categoryObj[item.id] = item;
      });
    });
    this.getTableData();
  },
  methods: {
    searchSubmit(form) {
      this.searchForm = form;
      this.getTableData();
    },
    getTableData() {
      api
        .list({
          page: this.page.current,
          size: this.page.pageSize,
          ...this.searchForm,
        })
        .then((res) => {
          this.page.total = res.total;
          // 从api成功获得 数据传给表格 数组形式
          this.tableData = res.data.map((item) => ({
            ...item,
            categoryName: this.categoryObj[item.category].name,
          }));
        });
    },
    changePage(page) {
      this.page = page;
      this.getTableData();
    },
    editProduct(record) {
      this.$router.push({
        name: 'ProductEdit',
        params: {
          id: record.id,
        },
      });
    },
    removeProduct(record) {
      this.$confirm({
        title: `Do you Want to delete ${record.title}?`,
        content: () => <div style="color:red;">{`确认删除标题为:${record.title}的商品吗`}</div>,
        onOk: () => {
          api
            .remove({
              id: record.id,
            })
            .then(() => {
              this.getTableData();
            });
        },
        onCancel() {
          console.log('Cancel');
        },
        class: 'delete-box',
      });
    },
  },
};
</script>

<style lang="less">
.product-list {
  position: relative;
  .product-add-btn {
    position: absolute;
    top: 10px;
    right: 20px;
  }
}
</style>
