<script setup lang="ts">
import { router } from '@inertiajs/vue3';
import { ref } from 'vue';
import Button from '@/components/ui/Button.vue';
import Icon from '@/components/ui/Icon.vue';
import TextInput from '@/components/ui/TextInput.vue';
import AuthLayout from '@/layouts/AuthLayout.vue';
import { dashboard as adminDashboard } from '@/routes/admin';

const password = ref('');

function submit(): void {
    router.visit(adminDashboard.url());
}
</script>

<template>
    <AuthLayout
        title="Confirm password"
        heading="Confirm your password"
        description="This is a secure area of the application. Please confirm your password before continuing."
    >
        <form class="mt-8 space-y-5" @submit.prevent="submit">
            <TextInput
                id="password"
                v-model="password"
                type="password"
                name="password"
                autocomplete="current-password"
                placeholder="••••••••"
                label="Password"
                autofocus
            />

            <Button type="submit" class="w-full">
                Confirm
                <Icon name="arrow-right" class="h-4 w-4" />
            </Button>
        </form>
    </AuthLayout>
</template>
