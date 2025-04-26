<template>
  <main class="max-w-3xl mx-auto px-3">
    <div class="pointer-events-none absolute -z-20 left-0 top-0 h-40 w-full bg-neutral-400 to-transparent backdrop-blur-xl [mask-image:linear-gradient(to_bottom,black,transparent)]" />

    <div class="w-full mt-[20%]">
      <div>
        <nav class="mb-40">
          <div class="flex space-x-4 justify-center">
            <NuxtLink to="/" class="text-gray-600 hover:text-black">
              Home
            </NuxtLink>
            <NuxtLink to="/about" class="text-gray-600 hover:text-black">
              About
            </NuxtLink>
          </div>
        </nav>
        <slot />
      </div>
    </div>
  </main>
</template>
