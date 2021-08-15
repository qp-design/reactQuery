import GoodsTable from './components/table'
import ParamsContextProvider from '../context'


const GoodsJsx = () => {

  return (
    <ParamsContextProvider>
      {/*<SearchTable />*/}
      <GoodsTable />
    </ParamsContextProvider>
  )
}
export default GoodsJsx
