import SteinStore from 'stein-js-client'

const store = new SteinStore(
  'https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4/'
)

export async function getListFish ({ commit }) {
  try {
    const fish = await store.read('list')

    commit('setListFish', fish)
  } catch (err) {
    console.error(err) // or do somethin when error e.g Notification
  }
}

export async function postFish ({ commit }, payload) {
  try {
    const res = await store.append('list', [payload])

    return new Promise((resolve) => {
      resolve(res)
    })
  } catch (err) {
    console.error(err)
  }
}

export async function deleteFish ({ commit }, payload) {
  try {
    const res = await store.delete('list', {
      search: payload
    })

    return new Promise((resolve) => {
      resolve(res)
    })
  } catch (err) {
    console.error(err)
  }
}
