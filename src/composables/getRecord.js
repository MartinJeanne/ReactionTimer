import { projectFirestore } from "../firebase/config"
import { ref } from '@vue/reactivity'

function getRecord() {
    const record = ref([])

    async function load() {
        try {
            const res = await projectFirestore.collection('record').get()
            record.value = res.docs.map(doc => {
                return { ...doc.data(), id: doc.id }
            })
        } catch (err) {
            console.log(err)
        }
    }
    return { record, load}
}

export default getRecord