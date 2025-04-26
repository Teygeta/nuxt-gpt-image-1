<script setup lang="ts">
const filters = ref({
  size: 'auto',
  quality: 'auto',
  background: 'auto',
})

const showSizeOptions = ref(false)
const showQualityOptions = ref(false)
const showBackgroundOptions = ref(false)

const sizeOptions = ['auto', '1024x1024', '1536x1024', '1024x1536']
const qualityOptions = ['auto', 'medium', 'high']
const backgroundOptions = ['auto', 'medium', 'transparent']

const { data } = await useFetch('/api/images')
const images = computed(() => data.value?.images || [])

const prompt = ref('')
const generating = ref(false)
const image = ref('')
async function generateImage() {
  generating.value = true
  try {
    const { data } = await useFetch('/api/generate', {
      query: {
        prompt: prompt.value,
        size: filters.value.size,
        quality: filters.value.quality,
        background: filters.value.background,
      },
    })
    image.value = data.value ? data.value.image : ''
  }
  catch (error) {
    console.error(error)
  }
  finally {
    generating.value = false
  }
}

const zoomedImage = ref('')
</script>

<template>
  <div>
    <div class="mb-16">
      <h1 class="font-medium text-[42px] text-center">
        gpt-image-1
      </h1>
    </div>

    <div class="w-full bg-neutral-100 p-1.5 pr-2 pl-4 border border-neutral-200 flex justify-between rounded-xl">
      <input
        v-model="prompt"
        type="text"
        class="font-medium text-neutral-800 w-full focus:outline-none mr-4"
        placeholder="A woman underneath a cherry blossom tree is setting up a picnic."
      >

      <button
        class="bg-neutral-900 flex items-center gap-2 border-t-2 border-neutral-500 py-1.5 px-4 rounded-lg text-neutral-100 hover:bg-neutral-800 hover:cursor-pointer active:bg-neutral-900"
        :disabled="generating"
        @click="generateImage"
      >
        <div v-if="generating" class="animate-spin h-4 w-4 border-2 border-neutral-100 rounded-full border-t-transparent" />
        {{ generating ? 'Generating...' : 'Generate' }}
      </button>
    </div>

    <div class="flex gap-2 mt-2 justify-end pr-1">
      <div class="relative">
        <button class="cursor-pointer px-7 rounded-lg border bg-neutral-100 border-neutral-200" @click="showSizeOptions = !showSizeOptions">
          <div class="text-xs -mb-2 text-neutral-500">
            Size
          </div>
          <div class="font-medium">
            {{ filters.size }}
          </div>
        </button>

        <div v-if="showSizeOptions" class="absolute mt-2">
          <div v-for="option in sizeOptions" :key="option" class="mt-1 rounded-lg border border-neutral-200 py-1.5 px-4 bg-white backdrop-blur-lg hover:bg-neutral-100 cursor-pointer" @click="() => { filters.size = option; showSizeOptions = false }">
            {{ option }}
          </div>
        </div>
      </div>

      <div class="relative">
        <button class="cursor-pointer px-7 rounded-lg border bg-neutral-100 border-neutral-200" @click="showQualityOptions = !showQualityOptions">
          <div class="text-xs -mb-2 text-neutral-500">
            Quality
          </div>
          <div class="font-medium">
            {{ filters.quality }}
          </div>
        </button>

        <div v-if="showQualityOptions" class="absolute mt-2">
          <div v-for="option in qualityOptions" :key="option" class="mt-1 rounded-lg border border-neutral-200 py-1.5 px-4 bg-white backdrop-blur-lg hover:bg-neutral-100 cursor-pointer" @click="() => { filters.quality = option; showQualityOptions = false }">
            {{ option }}
          </div>
        </div>
      </div>

      <div class="relative">
        <button class="cursor-pointer px-7 rounded-lg border bg-neutral-100 border-neutral-200" @click="showBackgroundOptions = !showBackgroundOptions">
          <div class="text-xs -mb-2 text-neutral-500">
            Background
          </div>
          <div class="font-medium">
            {{ filters.background }}
          </div>
        </button>

        <div v-if="showBackgroundOptions" class="absolute mt-2">
          <div v-for="option in backgroundOptions" :key="option" class="mt-1 rounded-lg border border-neutral-200 py-1.5 px-4 bg-white backdrop-blur-lg hover:bg-neutral-100 cursor-pointer" @click="() => { filters.background = option; showBackgroundOptions = false }">
            {{ option }}
          </div>
        </div>
      </div>
    </div>

    <img
      v-if="image"
      :key="image"
      :src="image"
      alt="Generated Image"
      class="shadow rounded cursor-pointer max-w-sm mt-10 mx-auto"
      @click="zoomedImage = image"
    >

    <div class="mt-10">
      <div class="flex gap-4">
        <div v-for="col in 3" :key="col" class="flex flex-col gap-4 flex-1">
          <img
            v-for="img in images.filter((_, i) => i % 3 === col - 1)"
            :key="img"
            :src="img"
            alt="Generated Image"
            class="shadow rounded cursor-pointer"
            @click="() => zoomedImage = img"
          >
        </div>
      </div>
    </div>

    <div v-if="zoomedImage" class="fixed top-0 left-0 w-full h-full bg-white backdrop-blur-3xl bg-opacity-75 flex justify-center items-center z-50" @click="zoomedImage = ''">
      <img :src="zoomedImage" alt="Zoomed Image" class="max-w-4xl max-h-4xl">
    </div>
  </div>
</template>
