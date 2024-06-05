import { Header } from "@/components/header";
import { useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { z } from "zod";
import { Container } from "@/components/ui/container";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const formSchema = z.object({
  motivo: z.string({ message: "Campo obrigatório" }),
  condicao_atual: z
    .string()
    .refine((value) => value !== "", { message: "Campo obrigatório" }),
  observacao: z.string().optional(),
  local_tipo: z.enum(["1", "2"], {
    required_error: "Escolha uma opção válida",
  }),
});

const RepairEquipment = () => {
  const { id } = useParams();
  const { toast } = useToast();

  const [location, setLocation] = useState<{
    latitude: null | number;
    longitude: null | number;
    hasLocale: boolean;
  }>({ latitude: null, longitude: null, hasLocale: false });
  const [mesmaLocalizacao, setMesmaLocalizacao] = useState(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      condicao_atual: "",
      motivo: "",
      observacao: "",
      local_tipo: "1",
    },
  });

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            hasLocale: true,
          });

          toast({
            description: (
              <>
                <p>Localizamos seu aparelho com sucesso!</p>
                <p>
                  Latitude: {position.coords.latitude}, Longitude:{" "}
                  {position.coords.longitude}
                </p>
              </>
            ),
            variant: "success",
          });
        },
        (err) => {
          toast({
            description: err.message,
            variant: "destructive",
          });

          setLocation({
            latitude: null,
            longitude: null,
            hasLocale: false,
          });
        }
      );
    } else {
      toast({
        description: "Geolocalização não é suportada pelo seu navegador.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (form.watch("local_tipo") === "1") {
      setMesmaLocalizacao(true);
    } else {
      setMesmaLocalizacao(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch("local_tipo")]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!location.hasLocale && !mesmaLocalizacao) {
      return toast({
        description:
          "Por favor, nos informe a localização do equipamento clicando no botão 'Obter localização Atual'.",
        variant: "destructive",
      });
    }

    if (mesmaLocalizacao) {
      return console.log({
        ...values,
        equipmentId: id,
      });
    }

    console.log({
      ...values,
      equipmentId: id,
      position: {
        latitude: location.latitude,
        longitude: location.longitude,
      },
    });
  }

  return (
    <>
      <Header />

      <Container>
        <h1 className="text-3xl font-bold text-white">Equipamento {id}</h1>

        <div className="mt-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="condicao_atual"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Condição atual do equipamento</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      required
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o estado atual do equipamento" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">1 - Péssimo</SelectItem>
                        <SelectItem value="2">2 - Ruim</SelectItem>
                        <SelectItem value="3">3 - Regular</SelectItem>
                        <SelectItem value="4">4 - Bom</SelectItem>
                        <SelectItem value="5">5 - Perfeito</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="motivo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Breve motivo da manutenção</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Cite brevemente o motivo da manutenção"
                        {...field}
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="observacao"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Observações</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Caso queira adicionar alguma observação..."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="local_tipo"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>O equipamento ficará no mesmo local?</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="1" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Mesma localização
                          </FormLabel>
                        </FormItem>

                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="2" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Outra localização
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-x-2 flex justify-end">
                {!mesmaLocalizacao && (
                  <Button type="button" variant="outline" onClick={getLocation}>
                    {location.hasLocale
                      ? "Redefinir localização"
                      : "Obter localização Atual"}
                  </Button>
                )}

                <Button type="submit">Enviar</Button>
              </div>
            </form>
          </Form>
        </div>
      </Container>
    </>
  );
};

export default RepairEquipment;
