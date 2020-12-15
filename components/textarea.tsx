export default function TextArea({ id, rows, placeholder }: {
    id?: string
    rows?: number
    placeholder?: string
}) {
    return (
        <>
            <textarea id={id} className="textarea" rows={rows} placeholder="明文"></textarea>
            <style jsx >{`
                .textarea {
                    display: block;
                    max-width: 100%;
                    min-width: 100%;
                    resize: vertical;
                    line-height: 22px;
                    padding: 8px 12px;
                    border-radius: 3px;
                    border: 1px solid #dbdbdb;
                    align-items: center;
                    color: var(--color-text);
                    display: inline-flex;
                    position: relative;
                }
    `}</style>
        </>
    )
}