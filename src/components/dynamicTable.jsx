import { useEffect, useRef, useCallback, useState } from 'react'
import { Table } from 'antd'
import PropTypes from 'prop-types';
import {useParamsContext} from '../context'

const TableJsx = ({ callback, data, columns, queryKey, ...props }) => {
  const { setParams } = useParamsContext()
  const table = useRef(null);
  const [height, setHeight] = useState(0);
  const measuredRef = useCallback(node => {
    if (node !== null) {
      const { y } = node.getBoundingClientRect()
      setHeight(`calc(100vh - ${y + 120}px)`);
    }
  }, []);

  useEffect(() => {
    table.current = document.querySelector('#table')
    table.current.addEventListener('click', tableClickImplement, false)

    return () => table.current.removeEventListener('click', tableClickImplement, false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const tableClickImplement = (e) => {
    let button = e.target.closest('button')
    if(!button) return;
    if(!table.current.contains(button)) return
    const action = button.dataset.action
    if(!action) return;
    callback(action, button.dataset.record)
  }

  return (
    <div
      id='table'
      ref={measuredRef}
    >
      <Table
        {...props}
        bordered
        scroll={{y: height}}
        dataSource={data?.data}
        columns={columns}
        pagination={ data?.currentPage ? {
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: () => `共${data.total}条`,
          pageSize: Number(data.perPage),
          current: Number(data.currentPage),
          total: Number(data.total),
          size: 'small',
          onChange: (current, pageSize) => setParams((prev) => {
            console.log(current, pageSize)
            return {...prev, page: current, page_size: pageSize}
          }),
        } : false }
      />
    </div>
  )
}

TableJsx.defaultProps = {
  callback: () => {}
}
TableJsx.propTypes = {
  callback: PropTypes.func
}
export default TableJsx
