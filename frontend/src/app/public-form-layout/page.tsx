import { useMemo } from "react";
import { Form } from "react-final-form";
import { useFetch } from "../../hooks/use-fetch";
import { api } from "../..//components/common/utils";

type InitialvaluesType = Record<string, unknown>;
const PublicFormLayout = () => {
    const formId =1;
    const response = useFetch({
        request: api.callGet,
        payload: {
            url: '/public-form',
            params: { formId }
        }
    });
    const initialValues = useMemo(() => {
        const result = {} as InitialvaluesType;
        result.name = 'kamlesh';
        return result;

    }, []);
    const validate = () => {
        const error = {};
        return error;
    }

    const onsubmit = (values:Record<string,unknown>)=>{
    }
    return (
        <div>
            <Form
                validate={validate}
                initialValues={initialValues}
                onSubmit={onsubmit}
                render={({handleSubmit}) => {
                    <form>

                    </form>
                }}

            />
        </div>
    )
}

export default PublicFormLayout;
