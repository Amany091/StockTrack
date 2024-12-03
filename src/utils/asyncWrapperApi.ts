import { toast } from "react-toastify"

type FetchOptions = {
    baseUrl: string,
    endPoint: string,
    method?: string,
    headers?: Record<string, string>,
    body?: string | FormData  ,
    searchParams?: Record<string, string | number>,
    credentials?: "omit" | "same-origin" | "include"
}

async function fetchApi<T>({ baseUrl, endPoint, method = "GET", body, searchParams, headers, credentials }:FetchOptions):Promise<T> {
    const url = new URL(endPoint, baseUrl)

    if (searchParams) {
        Object.keys(searchParams).forEach(key => url.searchParams.append(key, String(searchParams[key])))
    }

    const options: RequestInit = {
        method,
        headers,
        credentials
    }

    if (method !== "GET" && body ) {
        options.body = body
    }
    const response = await fetch(`${baseUrl}/${endPoint}?${url.searchParams.toString()}`, options)
    const data = await response.json()
    if (response.ok === false)  toast.error(data.errors[0].msg)
    return data
}

export default fetchApi