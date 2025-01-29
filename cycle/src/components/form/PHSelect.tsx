import { Form, Select,  } from "antd"
import { Controller } from "react-hook-form"

type TPHSelect = {
    label: string,
    name: string,
    type?: string,
    options?: {value: string, label: string}[] | undefined,
    disabled?: boolean
    mode?: 'multiple' | undefined
}


const PHSelect = ({label, name, options, disabled , mode}: TPHSelect) => {

  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
          mode={mode}
            style={{ width: '100%' }}
            {...field}
            options={options}
            size="large"
            disabled={disabled}
          />
          {error && <small style={{ color: 'red' }}>{error.message}</small> }
        
        </Form.Item>
      )}
    />
    
  );
}

export default PHSelect
