const genderMap =[
    {
      name: '男',
      id: 'male',
      img: "/male"
    },
{
  name: '女',
    id: 'female',
  img: "/female"
}
]
const GenderJsx = ({index, item:citem, sex, changeGender}) => {
  const changeSex = (e) => {
    changeGender(e.currentTarget.dataset.sex, citem, index)
  }


  return (
    <ul>
      {
        genderMap.map(item => (
          <li
            key={item.id}
            onClick={changeSex}
            data-sex={item.id}
          >
            <img src={item.img + (sex === 'male' ? 1 : 2) + ".png"} alt={item.name}/>
            <span>{item.name}</span>
          </li>
        ))
      }
    </ul>

  )
}

export default GenderJsx;