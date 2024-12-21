import { UserDataType } from '@/src/states/authentication/userSlice'
import {useState, useEffect} from 'react'

const useFetch = (url:string) => {
	const [data, setData] = useState<UserDataType[]>([])
	const [pending, setPending] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		fetch(url)
		.then(res => {
			if (!res.ok)
				throw Error("could not fetch resource!!")
			return res.json()
		})
		.then(data => {
			console.log("inside then : ")
			console.log(data)
			setData(data)
			setPending(false)
			setError(null)
		})
		.catch((err) => {
			setError(err.message)
			setPending(false)
			console.log(err.message)
		})
	}, [])


	return data
}

export default useFetch;
