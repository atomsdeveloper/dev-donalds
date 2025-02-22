"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Form, useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { isValidCpf } from "../helpers/cpf";

// Craindo esquema de válidação de formulário com o zod.
export const formSchema = z.object({
  // Dados do formúlario.
  name: z.string().trim().min(1, {
    message: "O nome é obrigatório",
  }),
  cpf: z
    .string()
    .trim()
    .min(1)
    .refine((value) => isValidCpf(value), {
      message: "CPF é obrigatório",
    }),
});

// Criando o tipo TypeFormSchema para receber a referência de formSchema acima.
type TypeFormSchema = z.infer<typeof formSchema>;

// Tipo para o fechar o Dialog de finalizar o Pedido.
interface FinishOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const FinishOrderDialog = ({ open, onOpenChange }: FinishOrderDialogProps) => {
  // React useForm usa o TypeFormSchema criado acima como tipos.
  const form = useForm<TypeFormSchema>({
    // React useForm usa o formSchema criado acima para válidar o formulário com os dados.
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      cpf: "",
    },
    shouldUnregister: true,
  });

  // Só vai ser executado se os dados do formulário forem válidos.
  const onSubmit = (data: TypeFormSchema) => {
    console.log(data);
  };
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild></DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Finalizar Pedido</DrawerTitle>
          <DrawerDescription>
            Insira sua informações abaixo para finalizar o seu pedido
          </DrawerDescription>
        </DrawerHeader>

        <div className="p-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* NOME */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>

                    <FormControl>
                      <Input placeholder="Dígite seu nome..." {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* CPF */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>

                    <FormControl>
                      {/* Máscara de CPF */}
                      <PatternFormat
                        placeholder="Dígite seu CPF"
                        format="###.###.##-##"
                        customInput={Input}
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <DrawerFooter>
                <Button type="submit" variant="destructive">
                  Finalizar
                </Button>

                <DrawerClose asChild>
                  <Button variant="outline" className="w-full rounded-full">
                    Cancelar
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </form>
          </Form>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default FinishOrderDialog;
