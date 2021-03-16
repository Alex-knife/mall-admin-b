<template>
  <a-table
    :columns="columns"
    :data-source="tableData"
    :pagination="page"
    @change="changePage"
  >
    <div slot="operations" slot-scope="text, record">
      <a-button @click="editProduct(record)">编辑</a-button>
      <a-button @click="removeProduct(record)">删除</a-button>
    </div>
  </a-table>
</template>
<script>

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
    ellipsis: true,
  },
  {
    title: '描述',
    dataIndex: 'desc',
    key: 'desc',
    ellipsis: true,
  },
  {
    title: '类目',
    dataIndex: 'categoryName',
    key: 'category',
    ellipsis: true,
  },
  {
    title: '预售价格',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: '折扣价格',
    dataIndex: 'price_off',
    key: 'price_off',
  },
  {
    title: '标签',
    dataIndex: 'tags',
    key: 'tags',
  },
  {
    title: '限制购买量',
    dataIndex: 'inventory',
    key: 'inventory',
  },
  {
    title: '上架状态',
    dataIndex: 'status',
    key: 'status',
    customRender(text, record) {
      return record.status === 1 ? '上架' : '下架';
    },
  },
  {
    title: '操作',
    dataIndex: 'operations',
    key: 'operations',
    width: 200,
    scopedSlots: { customRender: 'operations' },
  },
];

export default {
  data() {
    return {
      columns,
    };
  },
  // 获得父节点传递的api数据
  props: ['data', 'page'],
  computed: {
    // 遍历出item中唯一的id值
    tableData() {
      return this.data.map((item) => ({
        ...item,
        key: item.id,
      }));
    },
  },
  methods: {
    changePage(page) {
      this.$emit('change', page);
    },
    editProduct(record) {
      // this.$router.push({
      //   name: 'ProductEdit',
      //   params: {
      //     id: record.id,
      //   },
      // });
      this.$emit('edit', record);
    },
    removeProduct(record) {
      this.$emit('remove', record);
    },
  },
};
</script>
