
const LocationInfo = ({ name, description }) => {
    return (
        <section id="location-info" className="min-h-[80vh] py-28">
            <h2 className="text-8xl font-bold capitalize mb-10">{name}</h2>
            <p className="text-2xl text-justify max-w-4xl">{description}</p>
        </section>
    )
}

export default LocationInfo;