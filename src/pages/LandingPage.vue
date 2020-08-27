<template>
  <q-page class="flex flex-center">
    <q-table
      :data="fish"
      :columns="columns"
      row-key="name"
    >
      <template v-slot:top>
        <q-btn color="primary" label="Tambah Ikan" @click="addFish" />
        <!-- <q-btn color="primary" :disable="loading" label="Add row" @click="addRow" />
        <q-btn class="q-ml-sm" color="primary" :disable="loading" label="Remove row" @click="removeRow" />
        <q-space />
        <q-input borderless dense debounce="300" color="primary" v-model="filter">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input> -->
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'LandingPage',
  created () {
    this.getListFish()
  },
  data () {
    return {
      columns: [
        {
          name: 'komoditas',
          required: true,
          label: 'Komoditas',
          align: 'left',
          field: 'komoditas',
          format: value => value === null ? 'Belum Diisi' : value,
          sortable: true
        },
        {
          name: 'area_provinsi',
          align: 'left',
          label: 'Provinsi',
          field: 'area_provinsi',
          format: value => value === null ? 'Belum Diisi' : value,
          sortable: true
        },
        {
          name: 'area_kota',
          align: 'left',
          label: 'Kota',
          field: 'area_kota',
          format: value => value === null ? 'Belum Diisi' : value,
          sortable: true
        },
        {
          name: 'size',
          align: 'left',
          label: 'Size',
          field: 'size',
          format: value => value === null ? 'Belum Diisi' : value,
          sortable: true
        },
        {
          name: 'price',
          align: 'left',
          label: 'Price',
          field: 'price',
          format: value => value === null ? 'Belum Diisi' : value,
          sortable: true
        },
        {
          name: 'tgl_parsed',
          align: 'left',
          label: 'Parsed',
          field: 'tgl_parsed',
          format: value => value === null ? 'Belum Diisi' : value,
          sortable: true
        },
        {
          name: 'timestamp',
          align: 'left',
          label: 'Timestamp',
          field: 'timestamp',
          format: value => value === null ? 'Belum Diisi' : value,
          sortable: true
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      fish: 'landingPage/fish'
    })
  },
  methods: {
    ...mapActions({
      getListFish: 'landingPage/getListFish',
      postFish: 'landingPage/postFish'
    }),
    addFish () {
      this.postFish({
        komoditas: 'hello',
        area_provinsi: 'test',
        area_kota: 'efishery',
        size: 'rothem',
        price: 'uhuy',
        tgl_parsed: 'yeahh'
      })
        .then(res => alert(res.updatedRange))
    }
  }
}
</script>
