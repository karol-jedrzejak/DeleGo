<?php

namespace App\Enums;

enum DelegationStatus: string
{
    case DRAFT = 'draft';
    case SUBMITTED = 'submitted';
    case APPROVED = 'approved';
    case REJECTED = 'rejected';
    case PDF_READY = 'pdf_ready';

    public function label(): string
    {
        return match ($this) {
            null => '-',
            self::DRAFT => 'Szkic',
            self::SUBMITTED => 'Wysłana',
            self::APPROVED => 'Zatwierdzona',
            self::REJECTED => 'Odrzucona',
            self::PDF_READY => 'Gotowa do PDF',
        };
    }
}