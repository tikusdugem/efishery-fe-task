<template>
  <q-page class="flex flex-center">
    <q-table
      :data="fish"
      :columns="columns"
      row-key="uuid"
      :filter="filter"
    >
      <template v-slot:top>
        <div class="text-h6">List of Fish</div>
        <q-space />
        <q-input class="q-pr-md" outlined dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-btn color="primary" label="Add Fish" @click="addFish" />
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td class="q-gutter-xs" :props="props">
          <q-btn no-caps color="secondary" label="Edit" @click="editFish" />
          <q-btn no-caps color="negative" label="Delete" @click="delFish" />
        </q-td>
      </template>
    </q-table>

    <q-dialog v-model="isDialog">
      <q-card class="my-card">
        <q-card-section>
          <div class="text-h6 text-center">Form Tambah Ikan</div>
        </q-card-section>

        <q-card-section>
          <div class="q-gutter-md">
            <q-input outlined v-model="form.komoditas" label="Komoditas" />

            <q-skeleton v-if="isFormAreaLoading" type="QInput" />
            <q-select v-else outlined v-model="form.area_provinsi" :options="province" label="Provinsi" />

            <q-skeleton v-if="isFormAreaLoading" type="QInput" />
            <q-select v-else outlined v-model="form.area_kota" :options="city" label="Kota" />

            <q-skeleton v-if="isFormSizeLoading" type="QInput" />
            <q-select v-else outlined v-model="form.size" :options="size" label="Ukuran" />

            <q-input prefix="Rp. " outlined v-model.lazy="form.price" v-money="money" label="Harga" />

            <q-input outlined v-model="form.tgl_parsed" mask="date" :rules="['date']">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                    <q-date v-model="form.tgl_parsed">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn v-close-popup flat color="warning" label="Cancel" @click="resetForm" />
          <q-btn flat color="primary" label="Submit" @click="isConfirmDialog = true"/>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="isConfirmDialog" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-teal text-white" style="width: 300px">

        <q-card-section>
          Apakah anda yakin untuk menambahkan harga ikan?
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn :disable="isBtnConfirmDialog" flat label="Cancel" v-close-popup />
          <q-btn
            :disable="isBtnConfirmDialog"
            :loading="isBtnConfirmDialog"
            flat
            label="Wokeee"
            @click="submitFish"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { VMoney } from 'v-money'
import { date } from 'quasar'

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
          format: value => value === null ? '-' : value,
          sortable: true
        },
        {
          name: 'area_provinsi',
          align: 'left',
          label: 'Provinsi',
          field: 'area_provinsi',
          format: value => value === null ? '-' : value,
          sortable: true
        },
        {
          name: 'area_kota',
          align: 'left',
          label: 'Kota',
          field: 'area_kota',
          format: value => value === null ? '-' : value,
          sortable: true
        },
        {
          name: 'size',
          align: 'left',
          label: 'Size',
          field: 'size',
          format: value => value === null ? '-' : value,
          sortable: true
        },
        {
          name: 'price',
          align: 'left',
          label: 'Price',
          field: 'price',
          format: value => {
            if (value === null) {
              return '-'
            } else {
              return new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0
              })
                .format(value)
            }
          },
          sortable: true
        },
        {
          name: 'tgl_parsed',
          align: 'left',
          label: 'Parsed',
          field: 'tgl_parsed',
          format: value => {
            if (value === null) {
              return '-'
            } else {
              return date.formatDate(value, 'YYYY/MM/DD')
            }
          },
          sortable: true
        },
        {
          name: 'actions',
          align: 'center',
          label: 'Actions'
        }
      ],
      filter: '',

      isDialog: false,
      isConfirmDialog: false,
      isBtnConfirmDialog: false,
      isFormAreaLoading: false,
      isFormSizeLoading: false,

      form: {
        komoditas: '',
        area_provinsi: '',
        area_kota: '',
        size: null,
        price: null,
        tgl_parsed: date.formatDate(new Date(), 'YYYY/MM/DD')
      },

      money: {
        thousands: '.',
        precision: 0,
        masked: false /* doesn't work with directive */
      }
    }
  },
  directives: {
    money: VMoney
  },
  computed: {
    ...mapGetters({
      fish: 'landingPage/fish',
      province: 'landingPage/province',
      city: 'landingPage/city',
      size: 'landingPage/size'
    })
  },
  methods: {
    ...mapActions({
      getListFish: 'landingPage/getListFish',
      postFish: 'landingPage/postFish',
      deleteFish: 'landingPage/deleteFish',
      updateFish: 'landingPage/updateFish',
      getListArea: 'landingPage/getListArea',
      getListSize: 'landingPage/getListSize'
    }),
    resetForm () {
      this.form = {
        komoditas: '',
        area_provinsi: '',
        area_kota: '',
        size: null,
        price: null,
        tgl_parsed: date.formatDate(new Date(), 'YYYY/MM/DD')
      }
    },
    addFish () {
      this.isDialog = true

      if (this.province.length === 0 || this.city.length === 0) {
        this.isFormAreaLoading = true
      } else {
        this.isFormAreaLoading = false
      }

      if (this.size.length === 0) {
        this.isFormSizeLoading = true
      } else {
        this.isFormSizeLoading = false
      }

      this.getListArea()
        .then(() => {
          setTimeout(() => {
            this.isFormAreaLoading = false
          }, 300)
        })

      this.getListSize()
        .then(() => {
          setTimeout(() => {
            this.isFormSizeLoading = false
          }, 300)
        })
    },
    submitFish () {
      this.isBtnConfirmDialog = true

      this.postFish(this.form)
        .then(res => {
          this.$q.notify({
            message: res.updatedRange,
            color: 'primary',
            position: 'center'
          })
          this.isConfirmDialog = false
          this.isDialog = false

          this.getListFish()
        })
    },
    delFish () {
      this.deleteFish({
        size: 'rothem'
      })
        .then(res => alert(res.clearedRowsCount))
    },
    editFish () {
      this.updateFish([
        // Edit by column
        {
          size: 'z'
        },
        // Set data
        {
          area_provinsi: 'jakarta'
        }
      ])
        .then(res => alert(res.totalUpdatedRows))
    }
  }
}
</script>

<style lang="scss" scoped>
.my-card {
  width: 100%;
  max-width: 500px;
}
</style>
