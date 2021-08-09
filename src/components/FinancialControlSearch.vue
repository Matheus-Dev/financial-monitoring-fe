<template>
    <div class="financial-control-search">
        <input class="financial-control-input" v-model="parameters.search" placeholder="Insira a palavra-chave">
        <div>
            <select v-model="parameters.field" class="custom-select">
                <option v-for="col in columns" :value="col.field" :key="col.id">{{ col.title }}</option>
            </select>
        </div>
        <button class="button-search search-button"  @click="fetchData">Buscar</button>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import { getAllClients } from "@/services/financial-control.api"
@Component({
    props: ['data', 'columns', 'parameters']
})
export default class FinancialControlSearch extends Vue {

    @Prop()
    public data!: any

    @Prop()
    public columns!: any

    @Prop()
    public parameters!: any

    get getDataAPI() {
        return this.data
    }

    get getColumns() {
        return this.columns
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

    async fetchData() {
        const resp = await getAllClients(this.parameters);

        if (resp.status === 200) {
            if(this.parameters.page + 1 > resp.totalPage) {
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
.financial-control-search {
    display: flex;
    justify-content: left;
    align-items: center;
    padding-bottom: 1rem;
}

.financial-control-input {
  font-family: inherit;
  width: 100%;
  border: 0;
  border-bottom: 2px solid #9b9b9b;
  outline: 0;
  font-size: 1.3rem;
  padding: 7px 0;
  background: transparent;
  transition: border-color 0.2s;
}

.financial-control-input::placeholder {
  font-style: italic;
}

.button-search {
  color: #fff;
  padding: 10px 25px;
  text-align: center;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-style: none;
  width: 20%;
}

.button-search:hover {background-color: #3e8e41}

.search-button {
    background-color: #04AA6D;
}

.custom-select {
    width: 10rem;
    border-style: none;
    font-size: 16px;
    background-color: #04AA6D;
    color: #fff;
    height: 2.4rem;
    margin: 0;
    overflow: hidden;
    padding-top: 2px;
    padding-bottom: 2px;
}

</style>
