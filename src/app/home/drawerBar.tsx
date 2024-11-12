"use client";

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, SearchX, TrainFrontTunnel, UserRound } from 'lucide-react';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
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
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { account } from '../actions/auth';
import { useState } from 'react';


const suggestions = [
  'Amador Bueno', 'Brás', 'Bruno Covas Mendes Vila Natal', 'Calmon Viana',
  'Capão Redondo', 'Chácara Klabin', 'Corinthians-Itaquera', 'Estudantes',
  'Jabaquara', 'Jardim Colonial', 'Julio Prestes', 'Jundiai', 'Luz', 'Osasco',
  'Palmeiras-Barra Funda', 'Rio Grande da Serra', 'Tamanduatei', 'Tucuruvi',
  'Vila Madalena', 'Vila Prudente', 'Vila Sônia'
].sort();

const ticketTimetable = [
  "05:00",
  "05:30",
  "06:00",
  "06:30",
  "07:00",
  "07:30",
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
  "22:30",
  "23:00",
  "23:30",
  "00:00",
  "00:30",
]

interface DrawerMapsProps {
  currentUser: account
}


export default function DrawerMaps({ currentUser }: DrawerMapsProps) {
  const [searchValue, setSearchValue] = useState('');

  const handleInputChange = (event: any) => {
    setSearchValue(event.target.value);
  };

  const handleSearch = () => {
    console.log("Conteúdo do campo de pesquisa:", searchValue);
  };

  const station = suggestions.find((suggestion) => suggestion.toLowerCase() === searchValue.toLowerCase());

  return <div className="bg-white-700 mx-auto w-full h-full">
    <div className="absolute top-2 left-1/2 p-2 shadow-black z-1000 rounded -translate-x-1/2">
      <div className="flex justify-center items-center space-x-8">
        <Input
          size={120}
          type="text"
          id="location"
          list="suggestions"
          name="location"
          placeholder="Estação"
          value={searchValue}
          onChange={handleInputChange}
          className="bg-white px-3 pt-5 pb-5"
        />
        <datalist id="suggestions">
          {suggestions.map((suggestion, index) => (
            <option key={index} value={suggestion} />
          ))}
        </datalist>

        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="green" onClick={handleSearch}>
              <Search />
            </Button>
          </DrawerTrigger>
          <DrawerContent className="z-[1002] h-[60vh]">

            {
              station ? <>
                <DrawerHeader >
                  <DrawerTitle>Sejá bem vindo(a) {currentUser.name}</DrawerTitle>
                  <div className='flex gap-1 justify-center items-center'>
                    <TrainFrontTunnel size={32} />
                    <h2 className='font-black text-xl'>Estação Selecionada: {searchValue}</h2>
                  </div>
                </DrawerHeader>

                <div className='h-[90%] flex flex-col justify-center items-center'>
                  <div>
                    Horarios disponiveis:
                  </div>

                  <div>

                    <Carousel className="w-full max-w-md"> {/* Aumenta a largura máxima do Carousel */}
                      <CarouselContent className="-ml-1 w-full">
                        {ticketTimetable.map((hour, index) => (
                          <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
                            <div className="p-2">
                              <Card className="w-full h-full"> {/* Define uma altura maior */}
                                <CardContent className="flex items-center justify-center p-4"> {/* Aumenta o padding */}
                                  <div className="flex flex-col items-center">
                                    <div className='flex gap-4 items-center'>
                                      <span className="text-sm font-semibold">Saida:</span>
                                      <span>{hour}</span>
                                    </div>

                                    <div className='flex gap-4 items-center'>
                                      <span className="text-sm font-semibold">Chegada:</span>
                                      <span>{index + 1 < ticketTimetable.length ? ticketTimetable[index + 1] : "01:00"}</span>
                                    </div>


                                  </div>
                                </CardContent>
                              </Card>
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious />
                      <CarouselNext />
                    </Carousel>

                  </div>
                </div>


                <DrawerFooter className='flex flex-row justify-center'>
                  <Button variant="green">Comprar</Button>
                  <DrawerClose>
                    <Button variant="destructive">Cancelar</Button>
                  </DrawerClose>
                </DrawerFooter>
              </> :
                <DrawerHeader className="flex flex-col justify-center items-center h-full text-4xl  gap-20">
                  <SearchX size={160} />
                  Infelizmente essa estação não foi mapeada
                </DrawerHeader>
            }
          </DrawerContent>
        </Drawer>
      </div>
    </div>

    <div className="absolute top-2 right-2 z-1000">
      <Avatar
        className="
          flex flex-col justify-center 
          items-center bg-[var(--green-300)]
         text-white rounded-full p-4
         "
      >
        <AvatarImage alt="@shadcn" />
        <UserRound size={18} />
      </Avatar>
    </div>
  </div>
}
