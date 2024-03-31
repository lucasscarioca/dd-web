import { getStorage, ref, uploadBytes } from 'firebase/storage'
import { app } from './config'

const storage = getStorage(app)

export const upload = async (file: Blob, name: string) => {
	const fileRef = ref(storage, name + '.png')

	return await uploadBytes(fileRef, file)
}
