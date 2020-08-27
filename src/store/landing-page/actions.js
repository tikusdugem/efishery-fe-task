const SteinStore = require('stein-js-client')

export async function getListFish ({ commit }) {
  try {
    const store = new SteinStore(
      'https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4/'
    )
    const fish = await store.read('list')

    commit('setListFish', fish)
  } catch (err) {
    console.error(err) // or do somethin when error e.g Notification
  }
}
