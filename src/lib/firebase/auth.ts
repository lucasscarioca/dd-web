import {
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	getAuth,
	sendEmailVerification,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
	updatePassword,
	updateProfile,
} from 'firebase/auth'
import { app } from './config'
import { upload } from './storage'
import { getDownloadURL } from 'firebase/storage'

export const auth = getAuth(app)

async function getProfileUrl(avatar: Blob, name: string) {
	const snapshot = await upload(avatar, name)
	return await getDownloadURL(snapshot.ref)
}

export const signUpUser = async (
	email: string,
	password: string,
	name: string,
	avatar?: Blob
) => {
	return await createUserWithEmailAndPassword(auth, email, password).then(
		async userCredential => {
			await updateProfile(userCredential.user, {
				displayName: name,
				photoURL:
					avatar &&
					(await getProfileUrl(avatar, userCredential.user.uid)),
			})
			return userCredential
		}
	)
}

export const loginUser = async (email: string, password: string) => {
	return await signInWithEmailAndPassword(auth, email, password)
}

export const logoutUser = async () => {
	return await signOut(auth)
}

export const signInWithGoogle = async () => {
	const provider = new GoogleAuthProvider()
	const result = await signInWithPopup(auth, provider)
	return result
}

export const updateUser = async (name?: string, avatar?: Blob) => {
	if (!auth.currentUser) return
	await updateProfile(auth.currentUser, {
		displayName: name,
		photoURL: avatar && (await getProfileUrl(avatar, auth.currentUser.uid)),
	})
}

export const resetPassword = async (email: string) => {
	return await sendPasswordResetEmail(auth, email)
}

export const changePassword = async (password: string) => {
	if (!auth.currentUser) return
	return await updatePassword(auth.currentUser, password)
}

export const emailVerification = async () => {
	if (!auth.currentUser) return
	return await sendEmailVerification(auth.currentUser, {
		url: `${window.location.origin}/auth`,
	})
}
