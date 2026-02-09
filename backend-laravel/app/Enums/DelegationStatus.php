<?php

namespace App\Enums;

enum DelegationStatus: string
{
    case DRAFT = 'draft';
    case SUBMITTED = 'submitted';
    case APPROVED = 'approved';
    case REJECTED = 'rejected';
    case PDF_READY = 'pdf_ready';

    public static function options(): array
    {
        return array_map(fn($s) => [
            'value' => $s->value,   // np. "draft" → wysyłane w ?status=
            'label' => $s->label(), // np. "Szkic" → do selecta w React
        ], self::cases());
    }

    public function label(): string
    {
        return match ($this) {
            null => '-',
            self::DRAFT => 'Szkic',
            self::SUBMITTED => 'Weryfikowana',
            self::APPROVED => 'Zatwierdzona',
            self::REJECTED => 'Odrzucona',
            self::PDF_READY => 'Gotowa',
        };
    }

    public function color(): string
    {
        return match ($this) {
            null => '-',
            self::DRAFT => 'red',
            self::SUBMITTED => 'yellow',
            self::APPROVED => 'green',
            self::REJECTED => 'red',
            self::PDF_READY => 'blue',
        };
    }
}