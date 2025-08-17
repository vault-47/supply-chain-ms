ALTER TABLE "quote_requests" ALTER COLUMN "qr_num" SET DEFAULT 
    'QR-' || to_char(CURRENT_DATE, 'YYYYMMDD') || '-' ||
    lpad(nextval('quote_requests')::text, 4, '0')
  ;