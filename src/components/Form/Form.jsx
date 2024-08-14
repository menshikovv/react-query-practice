import { useForm } from "react-hook-form";
import './Form.scss';
import Error from "../Error/Error";

function Form({ onFormSubmit }) {
    const { formState, register, handleSubmit, reset } = useForm({
        mode: 'onBlur'
    });

    const usernameError = formState.errors['username']?.message;
    const emailError = formState.errors['email']?.message;

    const onSubmit = (data) => {
        console.log(data);
        reset();
        onFormSubmit();
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Welcome back</h2>
            <input type="text" placeholder="Ваше имя"
                {...register('username', {
                    required: "Это поле обязательно к заполнению",
                    pattern: {
                        value: /^[A-Za-zА-Яа-яЁё\s]+$/,
                        message: "Имя может содержать только буквы"
                    }})}
            />
            {usernameError && <Error error={usernameError} />}
            <input type="email" placeholder="Ваша почта"
                {...register('email', {
                    required: "Это поле обязательно к заполнению",
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: "Неверный адрес электронной почты"
                    }
                })}/>
            {emailError && <Error error={emailError} />}
            <button type="submit">ВОЙТИ</button>
        </form>
    )
}

export default Form;
