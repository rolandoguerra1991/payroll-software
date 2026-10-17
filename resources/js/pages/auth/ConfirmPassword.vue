<script setup lang="ts">
import { useForm } from '@inertiajs/vue3';
import Button from '@/components/ui/Button.vue';
import Icon from '@/components/ui/Icon.vue';
import TextInput from '@/components/ui/TextInput.vue';
import AuthLayout from '@/layouts/AuthLayout.vue';
import { store as passwordConfirmStore } from '@/routes/password/confirm';

const form = useForm({ password: '' });

function submit(): void {
    form.post(passwordConfirmStore.url());
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
                v-model="form.password"
                type="password"
                name="password"
                autocomplete="current-password"
                placeholder="••••••••"
                label="Password"
                autofocus
                :error="form.errors.password"
            />

            <Button type="submit" class="w-full" :disabled="form.processing">
                Confirm
                <Icon name="arrow-right" class="h-4 w-4" />
            </Button>
        </form>
    </AuthLayout>
</template>
