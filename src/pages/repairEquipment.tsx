/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { GeoapifyGeocoderAutocomplete } from "@geoapify/react-geocoder-autocomplete";

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

  const [mesmaLocalizacao, setMesmaLocalizacao] = useState(true);
  const [localeByAddress, setLocaleByAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
      setIsLoading(true);

      navigator.geolocation.getCurrentPosition(
        (position) => {
          handleSearchByCoordenate(
            position.coords.latitude,
            position.coords.longitude
          );
        },
        (err) => {
          setIsLoading(false);
          toast({
            description: err.message,
            variant: "destructive",
          });
        }
      );
    } else {
      setIsLoading(false);
      toast({
        description: "Geolocalização não é suportada pelo seu navegador.",
        variant: "destructive",
      });
    }
  };

  const handleSearchByCoordenate = async (lat: number, lon: number) => {
    fetch(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&lang=pt&apiKey=${
        import.meta.env.VITE_MAPS_API_KEY
      }`
    )
      .then((response) => response.json())
      .then((data) => {
        toast({
          description: <p>Localização selecionada com sucesso!</p>,
          variant: "success",
        });

        setLocaleByAddress(data.features[0].properties.address_line2);
        setIsLoading(false);
      });
  };

  const onPlaceSelect = (value: any) => {
    if (value === null) {
      return setLocaleByAddress("");
    }

    setLocaleByAddress(value.properties.address_line2);
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
    if (!localeByAddress && !mesmaLocalizacao) {
      return toast({
        description:
          "Por favor, nos informe a localização do equipamento clicando no botão 'Obter localização Atual'.",
        variant: "destructive",
      });
    }

    console.log({
      ...values,
      equipmentId: id,
    });
  }

  return (
    <>
      <Header />

      <Container>
        <h1 className="text-3xl font-bold text-white text-center">
          Manutenção
        </h1>

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

              {!mesmaLocalizacao && (
                <>
                  <FormItem className="input-autocomplete-address">
                    <FormLabel>Novo local de instalação</FormLabel>
                    <FormControl>
                      <GeoapifyGeocoderAutocomplete
                        placeholder="Digite o endereço"
                        lang="pt"
                        placeSelect={onPlaceSelect}
                        debounceDelay={1000}
                        value={localeByAddress}
                      />
                    </FormControl>
                  </FormItem>

                  <div className="justify-center flex">
                    <Button
                      type="button"
                      variant="seaBtn"
                      disabled={isLoading}
                      onClick={getLocation}
                    >
                      {isLoading
                        ? "Obtendo localização..."
                        : localeByAddress
                        ? "Redefinir localização"
                        : "Obter localização Atual"}
                    </Button>
                  </div>
                </>
              )}

              <div className="space-x-2 flex justify-end">
                <Button type="submit" variant="seaBtn">
                  Enviar
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </Container>
    </>
  );
};

export default RepairEquipment;
