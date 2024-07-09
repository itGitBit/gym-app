<template>
    <div class="participant-modal">
        <div class="participant-list">
            <table>
                <thead>
                    <th>Name</th>
                    <th>Phone Number</th>
                </thead>
                <tr v-for="participant in participants" :key="participant.id">
                    <td>{{ participant.name }}</td>
                    <td>{{ participant.phone }}</td>
                </tr>
            </table>

        </div>
        <div class="close-container">
            <button @click="$emit('closeParticipantsModal')">Close</button>
        </div>

    </div>

</template>

<script setup>

const props = defineProps({
    participants: {
        type: Array,
        required: true
    }
});

const emit = defineEmits(['closeParticipantsModal']);

</script>
<style scoped>
table {
    width: 100%;
    border-collapse: collapse;
    text-align: center;

}

th,
td {
    padding: 8px;
    border-bottom: 1px solid #797575;
    vertical-align: middle;
}

.close-container {
    display: flex;
    justify-content: center;
}


.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(247, 247, 247, 0.89);
  z-index: 999;
}

.participant-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgb(110, 110, 110);
  padding: 20px;
  border: none;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  box-shadow: 5px 10px 8px rgba(0, 0, 0, 0.2);
}
</style>