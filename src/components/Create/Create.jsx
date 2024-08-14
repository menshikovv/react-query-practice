import { useForm } from "react-hook-form";
import Error from "../Error/Error";
import './Create.scss'
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

function Create() {
    const { formState, register, handleSubmit, reset } = useForm({
        mode: 'onBlur'
    });

    const titleError = formState.errors['title']?.message;
    const aboutError = formState.errors['about']?.message;
    const queryClient = useQueryClient();
    const [isSuccess, setIsSuccess] = useState(false);

    const onSubmit = (data) => {
        setIsSuccess(false);
        mutate({
            title: data.title,
            body: data.about,
            userId: 1,
        });
        reset();
    }

    const {mutate, isPending} = useMutation({
        mutationKey: ['add post'],
        mutationFn: async (newPost) => {
            const response = await axios.post('https://jsonplaceholder.typicode.com/posts', newPost);
            return response;
        },
        onSuccess: (responce) => {
            if(responce.status === 201) {
                queryClient.invalidateQueries({queryKey: ['posts']});
                setIsSuccess(true);
            }
        }
    })

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="form-create">
                <h1 className="create-post">Создание поста</h1>
                <input type="text" placeholder="Название" 
                    {...register('title', {
                        required: "Эот поле обязательно к заполнению",
                        pattern: {
                            value: /^[A-Za-zА-Яа-яЁё0-9\s]+$/,
                            message: "Некорректный ввод"
                        }
                    })}
                />
                {titleError && <Error error={titleError}/>}
                <input type="text" placeholder="Описание" 
                    {...register('about', {
                        required: "Эот поле обязательно к заполнению",
                        pattern: {
                            value: /^[A-Za-zА-Яа-яЁё0-9\s]+$/,
                            message: "Некорректный ввод"
                        }
                    })}
                />
                {aboutError && <Error error={aboutError}/>}
                <button type="submit" disabled={isPending}>{isPending ? 'Загрузка' : 'Создать'}</button>
                {isSuccess && <p className="add">Пост создан!</p>}
            </form>
        </>
    )
}

export default Create;