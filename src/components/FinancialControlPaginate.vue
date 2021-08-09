<template>
    <div class="financial-control-paginate">
        <p>Quantidade de Registros</p>
        <select v-model="getParameters.limit" class="custom-select-paginate">
            <option v-for="col in columns" :value="col.value" :key="col.label">{{ col.label }}</option>
        </select>
        <button class="button-paginate search-button" :disabled="parameters.page === 1"  @click="prevPage">Prev</button>
        <p>{{ getParameters.page }}</p>
        <button class="button-paginate search-button" :disabled="!activeNextPage" @click="nextPage">Next</button>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import { getAllClients } from "@/services/financial-control.api"
@Component({
    props: ['data', 'parameters']
})
export default class FinancialControlPaginate extends Vue {

    @Prop()
    public data!: any

    @Prop()
    public parameters!: any

    public activeNextPage = true

    columns = [
        { label: "10", value: 10 },
        { label: "20", value: 20 },
        { label: "25", value: 25 },
        { label: "50", value: 50 }
    ]

    get getDataAPI() {
        return this.data
    }

    get getParameters() {
        return this.parameters
    }

    @Emit("updateData")
    updateData(data: any) {
        return data
    }

    @Emit("updateParameters")
    updateParameters(parameters: any) {
        return parameters
    }
    
    nextPage() {
        this.parameters.page++
        this.fetchData()
    }

    prevPage() {
        this.parameters.page--
        this.fetchData()
    }

    async fetchData() {
        const resp = await getAllClients(this.parameters);

        if (resp.status === 200) {
            if(this.parameters.page + 1 <= resp.totalPage) {
                this.activeNextPage = true
            } else {
                this.activeNextPage = false
                this.parameters.page = (resp.totalPage) ? resp.totalPage : 1
                this.fetchData()
            }
            this.updateData(resp.data)
            this.updateParameters(this.parameters)
        }
    }

}
</script>
<style>
.financial-control-paginate {
    display: flex;
    justify-content: right;
    align-items: center;
    float: right;
}

.button-paginate {
  background-color: #fff;
  color: #04AA6D;
  padding: 10px;
  text-align: center;
  display: inline-block;
  font-size: 12px;
  margin: 4px 2px;
  cursor: pointer;
  border-style: none;
  width: 3rem;
  border-radius: 50%;
}

.custom-select-paginate {
    width: 3rem;
    border-style: none;
    font-size: 16px;
    color: #fff;
    height: 2.4rem;
    color: #04AA6D;
}

</style>
