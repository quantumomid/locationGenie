
const LocationInfo = ({ name, description }) => {
    return (
        <section id="location-info" className="min-h-6/8 py-32">
            <h2 className="text-8xl font-bold capitalize mb-10">{name}</h2>
            <p className="text-2xl text-justify max-w-4xl">{description}</p>
        </section>
    )
}

export default LocationInfo;