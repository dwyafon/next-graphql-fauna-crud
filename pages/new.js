import { useState } from "react";
import Router from "next/router";
import gql from "graphql-request";
import { useForm } from "react-hook-form";
import Layout from "../components/layout";
import utilStyles from "../styles.utils.module.css";
import { graphQLClient } from "../utils/graphql-client";

const New = () => {
    const [errorMessage, setErrorMessage] = useState('');

    const { handleSubmit, register, error} = useForm()

    const onSubmit = handleSubmit(async ({ tas}) => {
        if (errorMessage) setErrorMessage('');

        const query = gql`
            mutation createATodo($task: String!) {
                createTodo(data: {task: $task, completed: false}) {
                    task
                    completed
                }
            }
        `;

        // try
    })
}