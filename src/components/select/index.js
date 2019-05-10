import React from 'react'
import { Select } from 'antd'
const Option = Select.Option;

class SelecetType extends React.Component {
    render(){
        const { selectData,type } = this.props;
        return <div className="syh-inputContent">
                <Select style={{ width: 200 }} defaultValue={this.props.defaultValue} onChange={
                (e)=>{
                    this.props.onChange(e,type)
                }
            } >
                {
                   selectData&&selectData.map((item,i)=>{
                        return <Option key={i} value={item.value} >{item.content}</Option>
                    })
                }
            </Select>
        </div>
    }
}
export default SelecetType