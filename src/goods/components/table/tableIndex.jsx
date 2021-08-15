import 'antd/dist/antd.css';
import DynamicTable from '../../../components/dynamicTable'
import { columns } from '../../config'
import { useCallback } from 'react'
import { useUpdateMutation, useDeleteMutation } from '../../../libs/hooks'
import {goodsDelete, goodsOffShelf, goodsPublish} from '../../../libs/api/goods-api'

const TableIndex = ({ params, ...resetProps }) => {
  const { mutate: deleteHandler } =  useDeleteMutation('goods', goodsDelete, params)
  const { mutate: publishHandler } =  useUpdateMutation('goods', goodsPublish, params)
  const { mutate: offShelf } =  useUpdateMutation('goods', goodsOffShelf, params)

  const editorAction = (params) => {
    console.log(params)
  }

  const upDown = (params) => {
    const { onSale, goodsId } = params;
    let paramsObj = {
      goodsId,
      onSale: onSale === '3' ? '2' : '3'
    }
    if(onSale === '3') {
      publishHandler(paramsObj)
    } else {
      offShelf(paramsObj)
    }
  }

  const deleteAction = (params) => {
    const { goodsId } = params
    deleteHandler({ goodsId})
  }

  const callback = useCallback((type, data) => {
    const dataObj = JSON.parse(data);
    switch (type) {
      case 'upDown':
        upDown(dataObj);
        break;
      case 'editor':
        editorAction(dataObj);
        break;
      case 'delete':
        deleteAction(dataObj);
        break;
      default:
        break;
    }
  }, [])

  return (
    <>
     <DynamicTable
       {...resetProps}
       callback={callback}
       columns={columns}
     />
   </>
  )
}

export default TableIndex
