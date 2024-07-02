<template>
    <div class="main">
        <h1>Edit Trainee</h1>
        <p>Trainee ID: {{ traineeId }}</p>

    </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref, onMounted } from 'vue'
import {getTraineeById} from '../../../../Utils/apiCalls.js'



const route = useRoute();
const traineeId = route.params.traineeId;
const trainee = ref(null)

const getTraineeAndRefIt = async () => {
    trainee.value = await getTraineeById(traineeId)
    console.log(JSON.stringify(trainee.value))
}


onMounted(() => {
    getTraineeAndRefIt();
})
</script>