function TwoToneCard({ headerContent, bodyContent }) {
    return (
        <div className="rounded-lg bg-gray-200 shadow">
            <div className="flex ">{headerContent}</div>
            <div className="rounded-lg bg-white">{bodyContent}</div>
        </div>
    )
}

export default TwoToneCard
