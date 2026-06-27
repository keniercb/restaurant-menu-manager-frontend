import {Card, CardContent} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Clock, MapPin, Star} from "lucide-react";
import {Link} from "react-router-dom";
import {mockRestaurants} from "@/data/mock";

export function Home() {
    return (
        <div className="space-y-8">
            <section className="text-center space-y-4 py-12">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
                    Los mejores sabores
                    <br />
                    <span className="text-accent">en un solo lugar</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                    Explora nuestra selección de restaurantes y ordena tus platos favoritos
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-6">Restaurantes Destacados</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {mockRestaurants.map((restaurant) => (
                        <Link key={restaurant.id} to={`/restaurant/${restaurant.id}`}>
                            <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                                <div className="relative h-52">
                                    <img
                                        src={restaurant.image}
                                        alt={restaurant.name}
                                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute top-3 left-3">
                                        <Badge className="bg-accent">Destacado</Badge>
                                    </div>
                                </div>
                                <CardContent className="p-5">
                                    <div className="flex items-start justify-between mb-2">
                                        <div>
                                            <h3 className="font-bold text-lg group-hover:text-accent transition-colors">
                                                {restaurant.name}
                                            </h3>
                                            <p className="text-sm text-muted-foreground">Tipo de cocina</p>
                                        </div>
                                        <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg">
                                            <Star className="h-4 w-4 text-amber-500 fill-amber-500"/>
                                            <span className="text-sm font-bold">{restaurant.rating}</span>
                                            <span
                                                className="text-xs text-muted-foreground">(10)</span>
                                        </div>
                                    </div>
                                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                                        {restaurant.description}
                                    </p>
                                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5"/>
                            15
                        </span>
                                        <span className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5"/>
                          Mín. 300
                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}