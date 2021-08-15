import TableIndex from './tableIndex'
import {Spin} from 'antd'
import {useParamsContext} from '../../../context'
import {useListQuery} from '../../../libs/hooks'
import {goodsQuery} from '../../../libs/api/goods-api'
export default function TableJsx() {
  const { params } = useParamsContext();
  const { data, isLoading, error } = useListQuery(params, 'goods', goodsQuery)
  console.log('error=========>', error);
  return (
    <Spin
      spinning={isLoading}
    >
      <TableIndex
        params={params}
        queryKey={'goods'}
        rowKey={'goodsId'}
        data={data}
      />
    </Spin>
  )
}
