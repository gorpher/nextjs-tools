export default function Input({ }: {
    rows?: number
}) {
    return (<textarea id="area_text" className="textarea mt-2" rows={rows} placeholder="明文"></textarea>)
}