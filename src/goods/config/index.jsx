import {Button, Space, Rate} from 'antd'

export const columns = [
  {
    key: 'onSale',
    title: '上架状态',
    dataIndex: 'onSale',
    align: 'center',
    width: 100,
    render: (text, record) => (
      <Button
        data-record={JSON.stringify(record)}
        data-action={'upDown'}
        type="link"
        icon={ <Rate count={1} value={text === '2'} /> }
      />
    )
  },
  {
    key: 'goodsName',
    title: '商品名称',
    dataIndex: 'goodsName',
    align: 'center',
    width: 300,
  },
  {
    key: 'action',
    title: '操作',
    isExportExclude: true, // 导出时是否剔除该项
    fixed: 'right',
    width: 410,
    dataIndex: 'action',
    render: (text, record) => <ActionsJsx record={record} />
  }
];

const ActionsJsx = ({record}) => (
  <Space>
    {
      actions.map(item =>
        <Button
          key={item.code}
          data-record={JSON.stringify(record)}
          data-action={item.code}>
          {item.name}
        </Button>
      )
    }
  </Space>
)

const actions = [
  {
    code: 'upDown',
    name: '上下架'
  },
  {
    code: 'editor',
    name: '编辑'
  },
  {
    code: 'delete',
    name: '删除'
  }
]
