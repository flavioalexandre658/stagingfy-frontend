'use client'

import { QRCodeCanvas } from "qrcode.react";

interface WhatsAppQRProps {
    code: string;
    size?: number;
}

export default function WhatsAppQR({ code, size = 256 }: WhatsAppQRProps) {
    return (
        <div className="flex items-center justify-center w-full max-w-full">
            <div className="bg-white p-3 rounded-2xl shadow-sm border max-w-full overflow-hidden">
                <div className="w-full max-w-full flex items-center justify-center">
                    <QRCodeCanvas
                        value={code}
                        size={Math.min(size, 280)} // Limita o tamanho máximo
                        includeMargin={true}
                        level="M"
                        className="max-w-full h-auto"
                        style={{
                            maxWidth: '100%',
                            height: 'auto',
                            width: '100%'
                        }}
                    />
                </div>
            </div>
        </div>
    );
}