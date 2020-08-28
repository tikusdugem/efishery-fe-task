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

export async function updateFish ({ commit }, payload) {
  try {
    const res = await store.edit('list', {
      search: payload[0],
      set: payload[1]
    })

    return new Promise((resolve) => {
      resolve(res)
    })
  } catch (err) {
    console.error(err)
  }
}

export async function getListArea ({ commit }) {
  try {
    const area = await store.read('option_area')
    const province = []
    const city = []

    // Manipulate data before caching
    area.forEach(element => {
      province.push(element.province)
      city.push(element.city)
    })

    commit('setListProvince', province)
    commit('setListCity', city)

    return new Promise((resolve) => {
      resolve()
    })
  } catch (err) {
    console.error(err) // or do somethin when error e.g Notification
  }
}

export async function getListSize ({ commit }) {
  try {
    const listSize = await store.read('option_size')
    const size = []

    // Manipulate data before caching
    listSize.forEach(element => {
      size.push(element.size)
    })

    commit('setListSize', size)

    return new Promise((resolve) => {
      resolve()
    })
  } catch (err) {
    console.error(err) // or do somethin when error e.g Notification
  }
}
