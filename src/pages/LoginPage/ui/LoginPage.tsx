'use client';

import { Link } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/shadcnui/ui/form';
import { Button } from '@/shared/components/shadcnui/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/shadcnui/ui/card';
import { Input } from '@/shared/components/shadcnui/ui/input';
import { PasswordInput } from '@/shared/components/shadcn-form/ui/password-input';
import { RoutePath } from '@/shared/config/routeConfig/routeConfig';
import { loginEv } from '../model/LoginPage.store';

// Improved schema with additional validation rules
const formSchema = z.object({
  email: z.string().email({ message: 'Неверный адрес электронной почты' }),
  password: z
    .string()
    .min(6, { message: 'Пароль должен быть длиной не менее 6 символов' })
    .regex(/[a-zA-Z0-9]/, { message: 'Пароль должен состоять из букв и цифр' }),
});

export default function LoginPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    loginEv(values);
  }

  return (
    <div className="flex flex-1 flex-col min-h-[50vh] h-full w-full items-center justify-center px-4">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Логин</CardTitle>
          <CardDescription>
            Введите свой адрес электронной почты и пароль для входа в свою учетную запись.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          placeholder="johndoe@mail.com"
                          type="email"
                          autoComplete="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <div className="flex justify-between items-center">
                        <FormLabel htmlFor="password">Пароль</FormLabel>
                      </div>
                      <FormControl>
                        <PasswordInput
                          id="password"
                          placeholder="******"
                          autoComplete="current-password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Войти
                </Button>
              </div>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Нету учётной записи?{' '}
            <Link to={RoutePath.register} className="underline">
              Создать учётную запись
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
